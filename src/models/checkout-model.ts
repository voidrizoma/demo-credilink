export interface CheckoutModel {
  isCheckout: boolean;
  issuer: {
    id: string;
    name: string;
    proposal: string;
    color: string;
  };
  userData: { email: string; amount: string };
}

export const initialCheckout = {
  isCheckout: false,
  issuer: {
    id: "kueski-id",
    name: "kueski",
    proposal: "Paga en quincenas desde 0% de interés",
    color: "#1d294c",
  },
  userData: {
    email: "fg0611@gmail.com",
    amount: "100",
  },
};
