import { Issuer } from "./issuer-model";

export interface Credilink {
    slug: string;
    template: string;
    emailSender: string;
    commerceName: string;
    commerce: string;
    issuer: string;
    issuers: Issuer[];
    colorPrimary: string;
    colorSecondary: string;
    sender: string;
    subject: string;
    title: string;
    description: string;
    logo: string;
    tyc: string;
    bg: string;
    min: number;
    max: number;
  }

  export const initialCredilink = {
    slug: "",
    template: "",
    emailSender: "",
    commerceName: "",
    commerce: "",
    issuer: "kueski",
    issuers: [],
    colorPrimary: "",
    colorSecondary: "",
    sender: "",
    subject: "",
    title: "",
    description: "",
    logo: "",
    bg: "",
    tyc: "",
    min: 0,
    max: 0,
  }