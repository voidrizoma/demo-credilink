import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { isValidEmail, isValidAmount } from "../helpers/validation";
import spinner_line from "../images/spinner_line.gif";
import {
  BgComponent,
  HeaderAndFormContainer,
  FormContainer,
  Form,
  Input,
  B,
  LogoContainer,
  MobileContainer,
  BContainer,
  Modal,
  ModalBox,
  ModalBoxBtn,
  ModalMsg,
} from "../styles/template-styles";
import axios from "axios";
const BASEURL = process.env.GATSBY_BASE_URL;

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;
  const {
    issuer,
    commerceName,
    color,
    logo,
    commerce,
    sender,
    subject,
    template,
  } = frontmatter;
  const background = frontmatter?.background?.childImageSharp?.fluid?.src;
  const aux = frontmatter?.aux?.childImageSharp.fluid.src;
  const minAmount = frontmatter?.min
    ? frontmatter.min
    : process.env.GATSBY_MIN_AMOUNT;
  const maxAmount = frontmatter?.max
    ? frontmatter.max
    : process.env.GATSBY_MAX_AMOUNT;
  const initialState = {
    issuer,
    commerce,
    amount: "",
    email: "",
  };
  const [dataUser, setDataUser] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  const isDisabledSubmit = () => {
    if (
      !dataUser.email?.length ||
      !dataUser.amount?.length ||
      !isValidEmail(dataUser.email) ||
      !isValidAmount(minAmount, maxAmount, dataUser.amount) ||
      isLoading
    ) {
      return true;
    }
    return false;
  };

  const onPetitionError = (msg) => {
    setisModalOpen(!isModalOpen);
    seterrMsg(msg);
    return;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    setisLoading(!isLoading);

    // return;
    let token = process.env.GATSBY_TOKEN;

    if (!token) {
      onPetitionError("Error de refresh token!");
      return;
    }

    if (!dataUser?.email?.length) {
      onPetitionError("Datos inválidos");
      return;
    }
    const postData = {
      grantType: "accessToken",
      refreshToken: token,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASEURL}/auth/tokens/refreshToken`, postData, axiosConfig)
      .then((res) => {
        const token = res.data.data.accessToken;
        if (!token) {
        }
        const dataCredit = {
          ...dataUser,
          amount: parseFloat(dataUser.amount) * 100,
        };

        const infoEmail = {
          subject,
          sender,
          logo,
          template,
          amount: dataUser.amount,
          email: dataUser.email,
        };
        localStorage.setItem("data", JSON.stringify(infoEmail));

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        if (dataCredit) {
          if (!dataCredit) {
            onPetitionError("Error de carga de datos!");
            return;
          }
          axios.post(`${BASEURL}/loans`, dataCredit, config).then((res) => {
            let url = res?.data?.data?.url;
            if (!url) {
              onPetitionError("Error: No se encontró la ruta al crédito");
            }
            setDataUser("");
            setisLoading(!isLoading);

            window.location.href = url;
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
      {isModalOpen && errMsg?.length && (
        <Modal>
          <ModalBox>
            <ModalMsg>{errMsg}</ModalMsg>
            <ModalBoxBtn
              onClick={() => {
                setisModalOpen(!isModalOpen);
                seterrMsg("");
                setisLoading(!isLoading);
                setDataUser(initialState);
              }}
            >
              OK
            </ModalBoxBtn>
          </ModalBox>
        </Modal>
      )}
      <Seo title={commerceName} />
      <>
        <MobileContainer>
          <>
            <HeaderAndFormContainer>
              <BgComponent
                style={{ backgroundImage: `url(${background})` }}
              ></BgComponent>
              <FormContainer sectionColor={color} background={background}>
                <LogoContainer src={logo} />
                <Form onSubmit={sendData} autoComplete="off">
                  <>
                    <h2>¡Llévate eso que tanto te gustó!</h2>
                    <p>
                      En {commerceName} compra en quincenas, paga sin intereses.
                      Obtén tu crédito en menos de 5 minutos.
                    </p>
                    <Input
                      value={dataUser.email}
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        height: "15px",
                      }}
                    >
                      <p
                        style={{
                          color: "red",
                          fontSize: "13px",
                        }}
                      >
                        {dataUser.email !== "" &&
                          !isValidEmail(dataUser?.email) &&
                          "Correo inválido"}
                      </p>
                    </span>

                    <Input
                      id="amount"
                      type="number"
                      name="amount"
                      placeholder="Monto de crédito"
                      value={dataUser.amount}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <div
                      style={{
                        height: "25px",
                      }}
                    >
                      {dataUser.amount !== "" &&
                        isValidAmount(minAmount, maxAmount, dataUser.amount) ===
                          false && (
                          <div>
                            <p
                              style={{
                                color: "red",
                                fontSize: "13px",
                              }}
                            >
                              {`Ingresa un monto entre ${minAmount} y ${maxAmount}, que sea múltiplo de 100`}
                            </p>
                          </div>
                        )}
                    </div>
                    <BContainer>
                      {isLoading ? (
                        <img src={spinner_line} alt=""></img>
                      ) : (
                        <B type="submit" disabled={isDisabledSubmit()}>
                          Quiero mi crédito
                        </B>
                      )}
                    </BContainer>
                  </>
                </Form>
                <Footer
                  sectionColor={color}
                  background={background}
                  aux={aux}
                />
              </FormContainer>
            </HeaderAndFormContainer>
          </>
        </MobileContainer>
      </>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        issuer
        commerceName
        color
        commerce
        subject
        sender
        template
        logo
        TYC
        max
        min
        background {
          childImageSharp {
            fluid(maxWidth: 1000) {
              src
            }
          }
        }
        aux {
          childImageSharp {
            fluid(maxWidth: 1000) {
              src
            }
          }
        }
      }
    }
  }
`;
export default Template;
