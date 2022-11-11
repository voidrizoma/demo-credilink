import React from "react";
import kueskiLogo from "../images/kueskipay.png";
import { ResponseContainer } from "../styles/template-styles";

export default function aproved({ amount, qrCode, exp, template, logo }) {
  const aplazoLogo = "https://firebasestorage.googleapis.com/v0/b/newflutter-549c4.appspot.com/o/00-Logo-Aplazo-600x200px.png?alt=media&token=919573b0-cefe-4628-9377-fac0fa5a9e58";

  return (
    <ResponseContainer>
      <title>Credilink - Crédito aprobado</title>
      <img
        style={{ width: "300px", marginBottom: "20px" }}
        src={template === "aplazo" ? aplazoLogo : kueskiLogo}
        alt="Success"
      />
      <h4>¡Felicidades, tu crédito ha sido aprobado!</h4>
      <p>
        Sólo presenta el siguiente código QR en caja para pagar tus productos y
        listo.
      </p>
      <p>Disfruta tu compra</p>
      <img style={{ width: "200px" }} src={qrCode} alt="QRCode" />
      <p>Monto aprobado: ${amount} </p>
      <p>Vigencia: {exp} </p>
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          background: "#182c4c",
          width: "100%",
          height: "10%",
          padding: "20px",
        }}
      >
        <img
          style={{ width: "40%", margin: "10px" }}
          src={logo}
          alt="Success"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
          // src="https://fluxqr.com/wp-content/uploads/2020/06/flux_blanco.png"
          height="auto"
          width="30%"
          alt="logo"
        />
      </footer>
    </ResponseContainer>
  );
}
