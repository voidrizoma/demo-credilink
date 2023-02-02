export interface Loan {
  id: string;
  commerce: string;
  logoIssuer: string;
  logoCommerce: string;
  title: string;
  text1: string;
  text2: string;
  qr: string;
  amount: string;
  expiration: string;
  bg: string
}

export const initialLoan = {
  id: "abc",
  commerce: "",
  logoIssuer: "",
  logoCommerce: "",
  title: "",
  text1: "",
  text2: "",
  qr: "",
  amount: "",
  expiration: "",
  bg: "",
}
