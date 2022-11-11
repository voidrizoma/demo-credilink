import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
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
        sethasLoan(false);
        navigate("https://www.fluxqr.com/")
      }, 2000);
    }
  }, [setData, loan]);

  useEffect(() => {
    const mailchimpSender = () => {
      setisModalOpen(true);
      setisLoading(true);
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
            content: dataEmail.expirationDate,
          },
        ],
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "POST",
        },
      };

      // POST - SENDS THE EMAIL
      axios
        .post(`${MailChimp}`, MailContent, config)
        .then((res) => {
          setisModalOpen(false);
          setisLoading(false);
        })
        .catch((err) => {
          onPetitionError(
            `Error ${
              err?.status !== undefined ? err?.status.toString() : "(email not sent)"
            }: ${err?.message}`
          );
        });
    };
    if (loan && dataEmail && data?.status === "approved") {
      if (!dataEmail?.loan) {
        const exp = new Date().toLocaleDateString();
        const expirationDate = `${exp} a las 23:59 horas`;
        const newLocalStorageData = { ...dataEmail, loan, expirationDate }
        setDataEmail(newLocalStorageData); 
        localStorage.setItem("data", JSON.stringify(newLocalStorageData));
        mailchimpSender();
      }
    }
  }, [loan, data, dataEmail]);

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
                  exp={dataEmail.expirationDate}
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
