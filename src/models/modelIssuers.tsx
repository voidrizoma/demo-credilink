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

// HELP LOGOS
import aplazoHelp from "../assets/help/btn_ayuda_AP.png";
import kueskiHelp from "../assets/help/btn_ayuda_KUESKI.png";
import mpHelp from "../assets/help/btn_ayuda_MP.png";
import coppelHelp from "../assets/help/btn_ayuda_CP.png";
import whatsappHelp from "../assets/help/whatsapp.png";

export enum IssuerEnum {
  mp = "mercadocredito",
  aplazo = "aplazo",
  coppel = "coppelpay",
  kueski = "kueskipay",
  baz = "prestamoazteca",
}

export interface Issuer {
  name: string;
  proposal: string;
  img: string;
  url: string;
}

export interface IssuerLogo {
  name: string;
  img: string;
}

export interface IssuerHelp {
  url: string;
  show: boolean;
  img: string;
  name: string;
}

export const issuersList: Issuer[] = [
  {
    name: IssuerEnum.aplazo,
    proposal: "Paga el 20% hoy y el resto en quincenas",
    img: aplazo,
    url: "https://cdn.fluxqr.net/images/issuers/aplazo.svg",
  },
  {
    name: IssuerEnum.mp,
    proposal: "Hasta 12 meses sin tarjeta",
    img: mp,
    url: "https://cdn.fluxqr.net/images/issuers/mercado_pago.svg",
  },
  {
    name: IssuerEnum.coppel,
    proposal: "Hasta 12 meses con tu crédito Coppel",
    img: coppel,
    url: "https://cdn.fluxqr.net/images/issuers/coppelpay.svg",
  },
  {
    name: IssuerEnum.kueski,
    proposal: "Compra ahora y paga después en quincenas \n",
    img: kueski,
    url: "https://cdn.fluxqr.net/images/issuers/kueskipay.svg",
  },
  {
    name: IssuerEnum.baz,
    proposal: "Tu eliges el plazo para pagar",
    img: baz,
    url: "https://cdn.fluxqr.net/images/issuers/prestamoazteca.svg",
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

export const issuersHelpList: IssuerHelp[] = [
  {
    url: "https://youtube.com/embed/2hwbvaiAQOA?feature=shared",
    show: false,
    img: kueskiHelp,
    name: "kueski"
  },
  {
    url: "https://youtube.com/embed/RKOIdBL4Y1A?feature=shared",
    show: false,
    img: aplazoHelp,
    name: "aplazo"
  },
  {
    url: "https://youtube.com/embed/u6ObUs7u9qg?feature=shared",
    show: false,
    img: mpHelp,
    name: "mp"
  },
  {
    url: "https://youtube.com/embed/tEL3MemnAxI?feature=shared",
    show: false,
    img: coppelHelp,
    name: "coppel"
  },
  {
    url: "",
    show: false,
    img: whatsappHelp,
    name: "whatsapp"
  }
]