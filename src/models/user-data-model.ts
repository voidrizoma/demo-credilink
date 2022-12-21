export interface UserData {
  email: string;
  amount: string;
  issuer: string;
  commerce: string;
}
export const initialUserData = <UserData>{
  email: "",
  amount: "",
  issuer: "",
  commerce: "",
};
