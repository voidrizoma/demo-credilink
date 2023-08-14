export interface StoreData {
  email: string;
  amount: string;
  phone: string;
  issuer: string;
  commerce: string;
  error: string;
  isLoading: boolean;
}
export const initialStoreData = <StoreData>{
  email: "",
  amount: "",
  phone: "",
  issuer: "",
  commerce: "",
  error: "",
  isLoading: false
};
