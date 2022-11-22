import styled from "styled-components";
import { Link } from "gatsby";

export const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 824px) {
    flex-direction: column;
  }
`;

export const BackgroundImage = styled.img`
  height: 100vh;
  width: 100%;
  height: 100%;
  display: none;
  object-fit: cover;
  opacity: 0.49;
  @media only screen and (max-width: 824px) {
    height: 150px;
    width: 100%;
  }
  @media only screen and (max-width: 470px) {
    height: 20vh;
    width: 100%;
  }
`;

export const BgComponent = styled.header`
  background-size: cover;
  width: 100%;
`;

export const LogoContainer = styled.img`
  padding: 20px 0 10px 0;
  width: 40%;
`;

export const BackgroundContainer = styled.section`
  height: 100vh;
  width: 60%;
  //background:  linear-gradient(to top, #182c4c, #182c4c);

  @media only screen and (max-width: 1144px) {
    width: 45%;
  }
  @media only screen and (max-width: 824px) {
    height: 150px;
    width: 100%;
  }
  @media only screen and (max-width: 470px) {
    height: 25vh;
    width: 100%;
  }
`;

export const FormContainer = styled.section`
  background: ${(props) => props.sectionColor || "#182c4c"};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  @media only screen and (max-width: 1144px) {
    background-image: url(${(props) => props.sectionColor});
    background-size: cover;
  }
  @media only screen and (max-width: 824px) {
    max-height: auto;
  }
  @media only screen and (max-width: 470px) {
    max-height: auto;
    background-image: url(${(props) => props.background});
  }
`;

export const MobileContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 824px) {
    text-align: center;
  }
`;

export const HeaderAndFormContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  width: 100%;

  @media only screen and (max-width: 824px) {
    display: flex;
    flex-flow: column wrap;
  }
`;

export const Form = styled.form`
  /* border: 2px solid #3050a5; */
  border: ${(props) =>
    props?.sectionColor
      ? `2px solid ${props.sectionColor}`
      : "2px solid #3050a5"};
  border-radius: 8px;
  background: white;
  padding: 20px;
  text-align: center;
  color: black;
  min-height: 300px;
  max-height: 500px;
  margin: auto 20% auto;

  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 470px) {
    width: 90%;
    padding: 30px;
  }
  @media only screen and (max-width: 320px) {
    padding: 16px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid #d7d7d7;
  background: #f5f5f5;
  margin: 5px 0px;
`;
export const B = styled.button`
  box-sizing: border-box !important;
  font-size: 14px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: ${(props) =>
    props.disabled
      ? "grey"
      : props?.sectionColor
      ? props.sectionColor
      : "#3050A5"};

  margin: 10px 0px;
  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export const BContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
`;

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  min-width: 150px;
  min-height: 150px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  flex-direction: column;
  padding: 25px;
`;

export const ModalMsg = styled.div`
  padding-top: 10%;
  min-height: 100px;
  border: none;
  font-size: 25px;
`;
export const ModalBoxBtn = styled.button`
  background-color: #3050a5;
  border-radius: 15px;
  height: 40px;
  color: white;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;

export const Footer = styled.footer`
  background-color: ${(props) => props.sectionColor};
  font-size: smaller;
  margin-top: 10% !important;
  bottom: 0;
  height: 90px;
  color: white;
  font-weight: 500;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* width: 800px; */
  width: 100%;
  margin: 0;
  justify-content: space-between;
  @media only screen and (max-width: 1024px) {
    bottom: -10px;
  }
  @media only screen and (max-width: 824px) {
    width: 100%;
    bottom: -10px;
  }
  @media only screen and (max-width: 470px) {
    bottom: -300px;
  }
  @media only screen and (max-width: 470px) {
    bottom: -180px;
  }
  @media only screen and (max-width: 320px) {
    flex-direction: column;
    bottom: -266px;
    justify-content: center;
    align-items: center;
  }
`;

export const AuxLogo = styled.img`
  max-width: 200% !important;
  max-height: 200% !important;
  width: auto !important;
`;

export const AnchordContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  color: white;
  font-weight: semi-bold;
  font-size: 12px;
  cursor: pointer;
  margin: 2px;
`;
export const ResponseContainer = styled.div`
  padding: 20px;
  background: white;
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: auto;
  p {
    margin: 5px;
  }
  @media only screen and (max-width: 470px) {
    width: 95%;
  }
`;

export const FooterPoweredByLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

export const IFrameDiv = styled.div`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center;
`;

export const IFrameContainer = styled.iframe`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  z-index: 999999;
`;
