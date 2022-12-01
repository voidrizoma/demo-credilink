import React, { useState, useEffect } from "react";
import { graphql, navigate } from "gatsby";
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
  const color2 = frontmatter?.color2;
  const aux = frontmatter?.aux;
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
  const [emailInputBlurred, setemailInputBlurred] = useState(false);

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
          logo: template === "aplazo" && aux?.length ? aux : logo,
          template,
          amount: dataUser.amount,
          email: dataUser.email,
          commerce: commerceName

        };
        localStorage.setItem("data", JSON.stringify(infoEmail));

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Referer": window.location.href,
          },
        };

        if (dataCredit) {
          if (!dataCredit) {
            onPetitionError("Error de carga de datos!");
            return;
          }
          axios
            .post(`${BASEURL}/loans`, dataCredit, config)
            .then((res) => {
              let url = res?.data?.data?.url;

              if (!url) {
                onPetitionError("Error: No se encontró la ruta al crédito");
                return;
              }
              setDataUser(initialState);
              setisLoading(!isLoading);
              navigate(url);
            })
            .catch((err) => {
              onPetitionError(
                `Error ${
                  err?.status !== undefined ? err?.status.toString() : ""
                }: ${err?.message}`
              );
            });
        }
      })
      .catch((err) => {
        onPetitionError(
          `Error ${err?.status !== undefined ? err?.status.toString() : ""}: ${
            err?.message
          }`
        );
      });
  };


  useEffect(() => {
    window.gtag !== undefined && console.log('gTag working')
    process.env.GATSBY_TOKEN !== undefined && console.log('envs working')
  }, [])

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
                <Form
                  onSubmit={sendData}
                  sectionColor={color2}
                  autoComplete="off"
                >
                  <h2>
                    {frontmatter?.formTitle ||
                      `¡Llévate eso que tanto te gustó!`}
                  </h2>
                  <p>
                    {frontmatter?.formTextBody ||
                      `En ${commerceName} compra en quincenas, paga sin intereses.
                      Obtén tu crédito en menos de 5 minutos.`}
                  </p>
                  <Input
                    value={dataUser.email}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                    onBlur={() => {
                      setemailInputBlurred(true);
                    }}
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
                      {emailInputBlurred &&
                      dataUser.email !== "" &&
                      !isValidEmail(dataUser?.email)
                        ? "Correo inválido"
                        : ""}
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
                      <B
                        type="submit"
                        disabled={isDisabledSubmit()}
                        sectionColor={color2}
                      >
                        Quiero mi crédito
                      </B>
                    )}
                  </BContainer>
                </Form>
                <Footer
                  sectionColor={color2}
                  aux={aux}
                  noFlux={frontmatter?.noFlux || false}
                  template={frontmatter?.template}
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
        color2
        commerce
        subject
        sender
        template
        logo
        aux
        TYC
        max
        min
        noFlux
        formTitle
        formTextBody
        background {
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
