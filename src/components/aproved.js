import React from "react";
import Succes from "../images/kueskipay.png";
import { ResponseContainer  } from "../styles/template-styles";

export default function aproved({ amount, qrCode , exp, logo}) {

  return (
    <ResponseContainer>
      <img style={{ width:"300px", marginBottom:"20px"}} src={Succes} alt="Success" />
      <h4>¡Felicidades, tu crédito ha sido aprobado!</h4> 
      <p>Sólo presenta el siguiente código QR en caja para pagar tus productos y listo.</p>   
      <p>Disfruta tu compra</p>    
      <img style={{ width:"200px"}} src={qrCode}  alt="QRCode"/>
      <p>Monto aprobado: ${amount} </p>
      <p>Vigencia: {exp} </p>
      <img style={{ width:"100px", margin:"10px"}} src={logo} alt="Success" />
      <footer style={{background:"#182c4c", width:"100%", padding:"20px"}}>
      <img
        src="https://fluxqr.com/wp-content/uploads/2020/06/flux_blanco.png"
        height="40px"
        alt="logo"
      />
      </footer>
 </ResponseContainer>
  );
}
