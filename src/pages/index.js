import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Location from "../components/Location";
import Aproved from "../components/aproved";
import Error from "../components/error";
import Rejected from "../components/rejected";
import axios from "axios";
const BASEURL = process.env.GATSBY_BASE_URL;
const MailChimp = process.env.GATSBY_MAILCHIMP;

const Response = ({ search }) => {
  const { loan } = search;
  const [data, setData] = useState({});
  const renderQR = `https://s7bljfsnh8.execute-api.us-east-1.amazonaws.com/Prod/qr?string=${encodeURIComponent(data.qr)}`;
  const [dataEmail, setDataEmail] = useState({});
  const exp = new Date().toLocaleDateString();
  const expirationDate = `${exp} a las 23:59 horas`;

  useEffect(() => {
    if (typeof window === "object" || typeof window !== "undefined") {
      const contentEmail = JSON.parse(localStorage.getItem("data"));
      setDataEmail(contentEmail);
    } else return 0;
  }, []);

  useEffect(() => {
    if (loan) {
      const fetchData = () => {
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
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            axios.get(`${BASEURL}/loans/${loan}`, config).then((res) => {
              setData(res.data.data);
            });
          });
      };

      fetchData();
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
            email: process.env.GATSBY_BBC_EMAIL
          }
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
      mailchimpSender();
    }
  }, [data, dataEmail, expirationDate]);

  return !loan ? (
    <Layout>

      <Error />
    </Layout>
  ) : (
    <Layout>
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1440,
          minHeight: "100vh",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignContent: "center"
        }}>

        {(() => {
          switch (data.status) {
            case "approved":
              return <Aproved amount={dataEmail.amount} qrCode={renderQR} exp={expirationDate} logo={dataEmail.logo} />;
            case "rejected":
              return <Rejected />;
            default:
          }
        })()}
      </div>
    </Layout>
  );
};

export default Location(Response);
