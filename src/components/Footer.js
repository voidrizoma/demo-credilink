import React from "react";
import {
  Footer,
  AnchordContainer,
  StyledLink,
} from "../styles/template-styles";

export default function footer(props) {
  return (
    <Footer>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
        height="30px"
        alt="logo"
      />
      {props?.aux && <img src={props?.aux} alt="logo" />}
      <div>
        <AnchordContainer>
          <StyledLink href="https://kueski.com/terminosdeuso" target="blank">
            Términos y condiciones
          </StyledLink>
          <StyledLink
            href="https://fluxqr.com/politica-de-privacidad/"
            target="blank"
          >
            Aviso de Privacidad
          </StyledLink>
        </AnchordContainer>
      </div>
    </Footer>
  );
}
