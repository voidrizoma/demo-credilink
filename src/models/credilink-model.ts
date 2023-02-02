export interface Credilink {
    slug: string;
    template: string;
    emailSender: string;
    commerceName: string;
    commerce: string;
    issuer: string;
    colorPrimary: string;
    colorSecondary: string;
    sender: string;
    subject: string;
    title: string;
    description: string;
    logo: string;
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
    issuer: "",
    colorPrimary: "",
    colorSecondary: "",
    sender: "",
    subject: "",
    title: "",
    description: "",
    logo: "",
    bg: "",
    min: 0,
    max: 0,
  }