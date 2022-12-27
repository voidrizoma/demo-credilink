export interface UserData {
  email: string;
  amount: string;
  issuer: string;
  commerce: string;
}
export const initialUserData = <UserData>{
  email: "e@e.com",
  amount: "100",
  issuer: "",
  commerce: "",
};
