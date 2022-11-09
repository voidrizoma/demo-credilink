import React from "react";
import {
  Footer,
  AnchordContainer,
  StyledLink,
  AuxLogo,
} from "../styles/template-styles";
import { FooterPoweredByLogo } from "../styles/template-styles";

export default function footer(props) {
  return (
    <Footer sectionColor={props?.sectionColor || "#182c4c"}>
      {!props?.noFlux && (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
          height="30px"
          alt="logo"
        />
      )}
      {props?.aux && <AuxLogo src={props.aux} alt="logo" />}
      <div>
        <AnchordContainer>
          <StyledLink
            href={
              props?.template === "aplazo"
                ? "https://aplazo.s3.us-west-1.amazonaws.com/docs/TyCAplazo.pdf"
                : "https://kueski.com/terminosdeuso"
            }
            target="blank"
          >
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

      {props?.noFlux && (
        <FooterPoweredByLogo>
          <div>
            <span>
            Powered By
            </span>
          </div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
              alt="logo"
            />
          </div>
        </FooterPoweredByLogo>
      )}
    </Footer>
  );
}
