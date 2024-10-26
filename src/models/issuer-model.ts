// BUTTONS
import aplazo from "../assets/aplazo.png";
import mp from "../assets/mp.png";
import coppel from "../assets/coppel.png";
import kueski from "../assets/kueski.png";
import baz from "../assets/baz.svg";
// LOGOS
import aplazol from "../assets/loan/aplazo_small.png";
import mpl from "../assets/loan/mercadopago_small.png";
import coppell from "../assets/loan/coppel_loan.png";
import kueskil from "../assets/loan/kueskipay_small.png";

export enum IssuerEnum {
  mp = "mp",
  aplazo = "aplazo",
  coppel = "coppel",
  kueski = "kueski",
  baz = "baz",
}

export interface Issuer {
  id: string;
  name: string;
  proposal: string;
  img: string;
  url: string;
  color: string;
}

export interface IssuerLogo {
  name: string;
  img: string;
}

export const issuersList: Issuer[] = [
  { 
    id: "aplazo-id",   
    name: IssuerEnum.aplazo,
    proposal: "Paga el 20% hoy y el resto en quincenas",
    img: aplazo,
    url: "https://cdn.fluxqr.net/images/issuers/aplazo.svg",
    color: "#FFC107",
},
{
    id: "aplazo-id",
    name: IssuerEnum.mp,
    proposal: "Hasta 12 meses sin tarjeta",
    img: mp,
    url: "https://cdn.fluxqr.net/images/issuers/mercado_pago.svg",
    color: "#FFC107",
},
{
    id: "aplazo-id",
    name: IssuerEnum.coppel,
    proposal: "Hasta 12 meses con tu crédito Coppel",
    img: coppel,
    url: "https://cdn.fluxqr.net/images/issuers/coppelpay.svg",
    color: "#FFC107",
},
{
    id: "aplazo-id",
    name: IssuerEnum.kueski,
    proposal: "Compra ahora y paga después en quincenas \n",
    img: kueski,
    url: "https://cdn.fluxqr.net/images/issuers/kueskipay.svg",
    color: "#FFC107",
},
{
    id: "aplazo-id",
    name: IssuerEnum.baz,
    proposal: "Tu eliges el plazo para pagar",
    img: baz,
    url: "https://cdn.fluxqr.net/images/issuers/prestamoazteca.svg",
    color: "#FFC107",
  },
];

export const issuerLogosList: IssuerLogo[] = [
  {
    name: IssuerEnum.aplazo,
    img: aplazol,
  },
  {
    name: IssuerEnum.mp,
    img: mpl,
  },
  {
    name: IssuerEnum.coppel,
    img: coppell,
  },
  {
    name: IssuerEnum.kueski,
    img: kueskil,
  },
];