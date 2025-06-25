import { Issuer } from "./issuer-model";
export interface StoreData {
  email: string;
  amount: string;
  phone: string;
  issuer?: Issuer;
  commerce: string;
  error: string;
  isLoading: boolean;
}
export const initialStoreData: StoreData = {
  email: "",
  amount: "",
  phone: "",
  issuer: undefined, // o `null` si lo prefieres, según el tipo
  commerce: "",
  error: "",
  isLoading: false
};
