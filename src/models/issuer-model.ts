// BUTTONS
import creditea from '../assets/crediteaPay.png'
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
  creditea = "creditea"
}

export interface Issuer {
  id: string;
  name: string;
  proposal: string;
  img: string;
  url?: string;
  color: string;
}

export interface IssuerLogo {
  name: string;
  img: string;
}

export const issuersList: Issuer[] = [

  {
    id: "creditea-id",
    name: IssuerEnum.creditea,
    proposal: "Tu eliges el plazo para pagar",
    img: creditea,
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
  {
    name: IssuerEnum.creditea,
    img: creditea,
  },
];