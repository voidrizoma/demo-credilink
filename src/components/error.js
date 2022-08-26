import React from 'react'
import { ResponseContainer  } from "../styles/template-styles";

export default function error() {
    return (
        <ResponseContainer>
        <h2>¡Lo sentimos mucho!</h2>
        <p>El proceso de tu crédito ha dado error</p>
      </ResponseContainer>
    )
}