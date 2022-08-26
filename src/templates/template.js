import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { validateEmail } from "../helpers/validateEmail";
import {
  BgComponent,
  HeaderAndFormContainer,
  FormContainer,
  Form,
  Input,
  B,
  LogoContainer,
  MobileContainer,
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
  const background = frontmatter.background.childImageSharp.fluid.src;
  const aux = frontmatter?.aux?.childImageSharp.fluid.src;
  const [dataUser, setDataUser] = useState({
    issuer,
    commerce,
    amount: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    let token = process.env.GATSBY_TOKEN;

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
          axios.post(`${BASEURL}/loans`, dataCredit, config).then((res) => {
            let url = res.data.data.url;
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
                          validateEmail(dataUser?.email) === null &&
                          "Correo no válido"}
                      </p>
                    </span>

                    <Input
                      id="amount"
                      type="number"
                      name="amount"
                      placeholder="Monto de crédito"
                      value={dataUser.amount}
                      onChange={handleInputChange}
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
                        {dataUser.amount !== "" &&
                          !isNaN(parseInt(dataUser.amount)) &&
                          (parseInt(dataUser.amount) <
                            process.env.GATSBY_MIN_AMOUNT ||
                            parseInt(dataUser.amount) >=
                              process.env.GATSBY_MAX_AMOUNT ||
                            parseInt(dataUser.amount) % 100 !== 0) &&
                          `Ingresa un monto entre ${parseInt(
                            process.env.GATSBY_MIN_AMOUNT
                          )} y ${
                            process.env.GATSBY_MAX_AMOUNT
                          } que sea múltiplo de 100`}
                      </p>
                    </span>
                    <B
                      type="submit"
                      disabled={
                        validateEmail(dataUser?.email) === null ||
                        parseInt(dataUser.amount) <
                          process.env.GATSBY_MIN_AMOUNT ||
                        parseInt(dataUser.amount) >=
                          process.env.GATSBY_MAX_AMOUNT ||
                        parseInt(dataUser.amount) % 100 !== 0
                      }
                    >
                      Quiero mi crédito
                    </B>
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
