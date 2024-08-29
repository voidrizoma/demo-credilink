export interface CheckoutModel {
  isLoading: boolean;
  isCheckout: boolean;
  isLogin: boolean;
  isFinalStep: boolean;
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
  isLogin: false,
  isCheckout: false,
  isFinalStep: false,
  issuer: {
    id: "",
    name: "",
    proposal: "",
    color: "",
  },
  userData: {
    email: "",
    amount: "",
    phone: "",
  },
};
