import { IssuerLogo, issuerLogosList, issuersList, type Issuer } from "~/models/issuer-model";

export const issuerFinder = (issuer: string) => {
    const found: Issuer | undefined = issuersList.find((e) => e.name === issuer);
    return found;
  };

export const issuerLogoFinder = (issuer: string) => {
    const found: IssuerLogo | undefined = issuerLogosList.find((e) => e.name === issuer);
    return found;
  };