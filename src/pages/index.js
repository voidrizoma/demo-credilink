import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Location from "../components/Location";
import Aproved from "../components/aproved";
import Error from "../components/error";
import Rejected from "../components/rejected";
import {
  Modal,
  ModalBox,
  ModalBoxBtn,
  ModalMsg,
} from "../styles/template-styles";
import spinner_line from "../images/spinner_line.gif";

const BASEURL = process.env.GATSBY_BASE_URL;
const MailChimp = process.env.GATSBY_MAILCHIMP;

const Response = ({ search }) => {
  const { loan } = search;
  const [hasLoan, sethasLoan] = useState(true);
  const [data, setData] = useState({});
  const renderQR = `https://qr.fluxqr.net/?text=${encodeURIComponent(data.qr)}`;
  const [dataEmail, setDataEmail] = useState({});
  const exp = new Date().toLocaleDateString();
  const expirationDate = `${exp} a las 23:59 horas`;
  const [isLoading, setisLoading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  const onPetitionError = (msg) => {
    setisLoading(false);
    setisModalOpen(true);
    seterrMsg(msg);
    return;
  };

  useEffect(() => {
    if (typeof window === "object" || typeof window !== "undefined") {
      const contentEmail = JSON.parse(localStorage.getItem("data"));
      setDataEmail(contentEmail);
    } else return 0;
  }, []);

  useEffect(() => {
    if (loan) {
      setisModalOpen(true);
      setisLoading(true);

      const fetchData = () => {
        let token = process.env.GATSBY_TOKEN;

        !token && onPetitionError("No token found");

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
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            axios
              .get(`${BASEURL}/loans/${loan}`, config)
              .then((res) => {
                setisLoading(false);
                setisModalOpen(false);
                setData(res.data.data);
              })
              .catch((err) => {
                onPetitionError(
                  `Error ${
                    err?.status !== undefined ? err?.status.toString() : ""
                  }: ${err?.message}`
                );
              });
          })
          .catch((err) => {
            onPetitionError(
              `Error ${
                err?.status !== undefined ? err?.status.toString() : ""
              }: ${err?.message}`
            );
          });
      };

      fetchData();
    } else {
      setTimeout(() => {
        sethasLoan(false)
      }, 2000);
    }
  }, [setData, loan]);

  useEffect(() => {
    const mailchimpSender = () => {
      const MailContent = JSON.stringify({
        template: dataEmail.template,
        subject: dataEmail.subject,
        senderName: dataEmail.sender,
        sender: "regalink@fluxqr.com",
        to: [
          {
            email: dataEmail.email,
          },
          {
            email: process.env.GATSBY_BBC_EMAIL,
          },
        ],
        globalMergeVars: [
          {
            name: "amount",
            content: data.amount / 100,
          },
          {
            name: "cupon",
            content: encodeURIComponent(data.qr),
          },
          {
            name: "logoCommerce",
            content: dataEmail.logo,
          },
          {
            name: "expiration",
            content: expirationDate,
          },
        ],
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "POST",
        },
      };
      if (data.status === "approved") {
        axios
          .post(`${MailChimp}`, MailContent, config)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    if (dataEmail) {
      console.log("sending email")
      mailchimpSender();
    }
  }, [data, dataEmail, expirationDate]);

  return loan ? (
    <Layout>
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1440,
          minHeight: "100vh",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {isModalOpen && (
          <Modal>
            <ModalBox>
              {isLoading && <img src={spinner_line} alt=""></img>}
              {errMsg?.length && <ModalMsg>{errMsg}</ModalMsg>}
              {errMsg?.length && (
                <ModalBoxBtn
                  onClick={() => {
                    setisModalOpen(false);
                    seterrMsg("");
                    setisLoading(false);
                  }}
                >
                  OK
                </ModalBoxBtn>
              )}
            </ModalBox>
          </Modal>
        )}
        {(() => {
          switch (data.status) {
            case "approved":
              return (
                <Aproved
                  amount={dataEmail.amount}
                  qrCode={renderQR}
                  exp={expirationDate}
                  template={dataEmail.template}
                  logo={dataEmail.logo}
                />
              );
            case "rejected":
              return <Rejected />;
            default:
          }
        })()}
      </div>
    </Layout>
  ) : (
    <Layout>{!hasLoan && <Error />}</Layout>
  );
};

export default Location(Response);
