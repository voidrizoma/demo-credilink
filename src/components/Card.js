import React from "react";

export default function Card({ image, response, commerce, name, amount }) {
  return (
    <div>
      <p>¡Gracias por la espera, {name}!</p>
      <img src={image} />
      <p>Tu crédito  por un monto de ${amount}, en {commerce} {response} ha sido aprobado </p>
    </div>
  );
}
