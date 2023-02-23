export interface CheckoutModel {
  isLoading: boolean;
  isCheckout: boolean;
  isLogin: boolean;
  issuer: {
    id: string;
    name: string;
    proposal: string;
    color: string;
  };
  userData: { email: string; amount: string };
}

export const initialCheckout = {
  isLoading: false,
  isLogin: false,
  isCheckout: false,
  issuer: {
    id: "kueski-id",
    name: "kueski",
    proposal: "Paga en quincenas desde 0% de interés",
    color: "#1d294c",
  },
  userData: {
    email: "",
    amount: "",
  },
};
