import { component$, $ } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import kueski1 from "../../../assets/checkout/kueski1.png";
import { getExpDate } from "~/helpers/dates";
import Kueski1 from "./kueski-minors/kueski1";
import Kueski2 from "./kueski-minors/kueski2";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>
  const checkoutSubmit = $(async (loanId: string) => {
    props.checkout.isLoading = true;
    // const expiresIn = new Date();
    // expiresIn.setHours(23, 59, 59, 0).toLocaleString();

    try {
      const baseUrl = envVars.apiUrlFlux;
      const token = envVars.tokenFlux;

      const authData = {
        grantType: "accessToken",
        refreshToken: token,
      };

      const appJsonHeader = { "Content-type": "application/json" };

      await fetch(`${baseUrl}/auth/tokens/refreshToken`, {
        method: "POST",
        headers: new Headers(appJsonHeader),
        body: JSON.stringify(authData),
      }).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          const { data } = await res.json();
          const resToken = data?.accessToken;
          // console.log("resToken ::: ", resToken);

          const dataCoupon = {
            commerce: props.credilink.commerce,
            amount: Math.round(Number(props.checkout.userData.amount) * 100),
            expiration: `${getExpDate()}T05:59:59.999Z`,
            // expiration: "2023-12-12T05:59:59.999Z",
            isPayable: false,
            customer: {
              name: "Usuario de prueba",
              email: props.checkout.userData.email,
            },
          };
          // console.log(dataCoupon);
          await fetch(`${baseUrl}/coupons`, {
            method: "POST",
            headers: new Headers({
              ...appJsonHeader,
              Authorization: `Bearer ${resToken}`,
            }),
            body: JSON.stringify(dataCoupon),
          }).then(async (res) => {
            const { data } = await res.json();
            if (data) {
              console.log(data);
            }
            if (data?.id?.length) {
              try {
                const zapierData = {
                  tel: `+52${props.checkout.userData.phone}`,
                  id: data.id,
                  imgUrl: `https://qr.fluxqr.net/?text=${encodeURIComponent(
                    data.qr
                  )}`,
                  amount: `$${parseFloat(data.amount) / 100}`,
                  commerce: props.credilink.commerceName,
                  expiration: data.expiration,
                  qr: data.qr,
                };
                console.log("zapierdata", zapierData);
                const zapierRes = await fetch(envVars.urlZapier, {
                  method: "POST",
                  body: JSON.stringify(zapierData),
                });
                const result = await zapierRes.json();
                console.log("success", result);
                if (zapierRes?.status === 200) {
                  console.log(data);
                  window.location.href = `/?loan=${data.id}`;
                }
              } catch (e) {
                console.log("error", e);
              }
            } else {
              window.location.href = `/?loan=${loanId}`;
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {props.checkout.isLoading && <ModalLoading />}
      <div>
        <img class='blur-[3px] max-h-screen' src={kueski1} />
        {!props.checkout.isFinalStep && <Kueski1 checkout={props.checkout}/>}
        {props.checkout.isFinalStep && <Kueski2 checkout={props.checkout} checkoutSubmit={checkoutSubmit}/>}
      </div>
    </>
  );
});
