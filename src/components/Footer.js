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
        src="https://fluxqr.com/wp-content/uploads/2020/06/flux_blanco.png"
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
