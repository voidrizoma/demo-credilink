import { CheckoutModel } from "~/models/checkout-model";
import { Credilink } from "~/models/credilink-model";

export const prepareMailData = (
  credilink: Credilink,
  checkout: CheckoutModel,
  expiresIn: string,
  qr: string
) => {
  qr;
  const result = JSON.stringify({
    template: "kueski",
    subject: credilink.subject,
    senderName: "Francisco",
    sender: "regalink@fluxqr.com",
    to: [
      {
        email: checkout.userData.email,
      },
    ],
    globalMergeVars: [
      {
        name: "amount",
        content: parseInt(checkout.userData.amount) / 100,
      },
      {
        name: "cupon",
        content: encodeURIComponent("tu crédito es éste"),
      },
      {
        name: "logoCommerce",
        content: credilink.logo,
      },
      {
        name: "expiration",
        content: expiresIn,
      },
    ],
  });
  console.log(result)
  return result;
};

export const mailChimpMock = (templateData: any) => {
  console.log(templateData?.name);
  return true;
};
