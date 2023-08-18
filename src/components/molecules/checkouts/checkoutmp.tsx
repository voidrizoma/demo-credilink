import { component$, $, useStore } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import mp1 from "../../../assets/checkout/mp1.png";
import mp2 from "../../../assets/checkout/mp2.png";
import mp22 from "../../../assets/checkout/mp22.png";
import mp23 from "../../../assets/checkout/mp23.png";
import mp3 from "../../../assets/checkout/mp3.png";
import CustomText from "~/components/atoms/customText";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  const fees = [
    { factor: 1.0763, cuotes: 1 },
    { factor: 1.1422, cuotes: 3 },
    { factor: 1.2466, cuotes: 6 },
    { factor: 1.356033333, cuotes: 9 },
    { factor: 1.471433333, cuotes: 12 },
  ];
  // NAVIGATES TO /?loan=<ID>
  const state = useStore({
    currentOption: "",
    isLoading: false,
  });

  const checkoutSubmit = $(async (loanId: string) => {
    state.isLoading = true;
    const expiresIn = new Date();
    expiresIn.setHours(23, 59, 59, 0).toLocaleString();

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
          const dataCoupon = {
            commerce: props.credilink.commerce,
            amount: parseInt(props.checkout.userData.amount) * 100,
            expiration: "2023-12-12T05:59:59.999Z",
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
                  expiration: `${new Date(data.expiration).toLocaleString(
                    "es-MX",
                    {
                      timeZone: "America/Mexico_City",
                      dateStyle: "long",
                      timeStyle: "short",
                    }
                  )}hrs`,
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
      {state.isLoading && <ModalLoading />}
      <div class="flex flex-col rounded max-w-[500px]">
        <img src={mp1} alt="mp-top-image-logo" />
        <div class="flex flex-row justify-between place-content-center px-8 py-3">
          <CustomText
            text={props.credilink.commerceName}
            color="#646464"
            size="18px"
          />
          <CustomText
            text={`$${parseFloat(props.checkout.userData.amount).toFixed(2)}`}
            color="#646464"
            size="18px"
          />
        </div>
        <div class="bg-[#f0f0f0] p-6">
          <div class="flex justify-center">
            <img class="max-w-[320px]" src={mp2} alt="mp-middle-image-logo" />
          </div>
          <div class="py-3 bg-white rounded-[5px]">
            <img src={mp22} alt="mp22-image" />
            <div class="flex items-center">
              <div class="flex justify-center items-center mx-2 w-[54px] h-[54px] rounded-[50px] border-[#c2c0c0] border-[1px]">
                <p class='text-[18px] text-[#02b1e9] font-bold p-0 m-0'>
                  {!state.currentOption?.length
                    ? "1x"
                    : state.currentOption.slice(0, 3)}
                </p>
              </div>
              <div class="flex flex-col py-3 px-4">
                <p class="text-[18px] text-[#444444]">Meses</p>
                <select
                  onChange$={(e) => {
                    console.log(e.target.value);
                    state.currentOption = e.target.value;
                  }}
                  class="mb-6 px-2 max-w-[400px] min-h-[60px] text-[#646464] border-gray-200 border-[2px] rounded-[5px]"
                >
                  {fees.map((e) => (
                    <option>{`${e.cuotes}x $ ${(
                      (e.factor * parseFloat(props.checkout.userData.amount)) /
                      e.cuotes
                    ).toFixed(2)} ($ ${(
                      e.factor * parseFloat(props.checkout.userData.amount)
                    ).toFixed(2)})`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* QUOTES */}
          <div class="flex flex-col items-center text-[20px] font-semibold pt-3">
            <div class="max-w-[350px]">
              <img class="py-8" src={mp23} alt="mp23-image-logo" />
            </div>
            <button
              class="text-white rounded-[5px] border-none h-[40px] w-full bg-[#02b1e9]"
              preventdefault:click
              onClick$={() => {
                checkoutSubmit(props.checkout.issuer.id);
              }}
              disabled={state.isLoading}
            >
              Pagar
            </button>
            <div class="max-w-[120px]">
              <img src={mp3} alt="mp3-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
