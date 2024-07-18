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
  userData: { email: string; amount: string; phone: string };
}

export const initialCheckout = {
  isLoading: false,
  isLogin: true,
  isCheckout: false,
  issuer: {
    id: "",
    name: "kueski",
    proposal: "",
    color: "#1d294c",
  },
  userData: {
    email: "",
    amount: "",
    phone: "",
  },
};
