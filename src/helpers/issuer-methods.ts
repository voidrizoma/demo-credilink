import { Issuer } from "~/models/issuer-model";
import coppel from "../assets/coppel.svg";
import aplazo from "../assets/aplazo.svg";
import baz from "../assets/baz.svg";
import mp from "../assets/mp.svg";
import kueski from "../assets/kueski.svg";


export const issuerLogoFinder = (issuer: Issuer) => {
    if (issuer.name === "coppel") {
      return coppel;
    }
    if (issuer.name === "aplazo") {
      return aplazo;
    }
    if (issuer.name === "baz") {
      return baz;
    }
    if (issuer.name === "mp") {
      return mp;
    }
    if (issuer.name === "kueski") {
      return kueski;
    }
  };
