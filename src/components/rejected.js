import React from 'react'
import Declined from "../images/error.png";
import { ResponseContainer  } from "../styles/template-styles";

export default function rejected() {
    return (
        <ResponseContainer>
        <h2>¡Lo sentimos mucho!</h2>
        <p>Tu crédito ha sido rechazado</p>
        <img src={Declined}  alt="declined"/>
      </ResponseContainer>
    )
}