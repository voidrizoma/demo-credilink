export interface StoreData {
  email: string;
  amount: string;
  issuer: string;
  commerce: string;
  error: string;
  isLoading: boolean;
}
export const initialStoreData = <StoreData>{
  email: "",
  amount: "",
  issuer: "",
  commerce: "",
  error: "",
  isLoading: false
};
