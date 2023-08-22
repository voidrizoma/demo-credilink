import { component$, $, useStore } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import coppel1 from "../../../assets/checkout/coppel1.png";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
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
      <div class="flex flex-col gap-1 max-w-[500px] m-3 px-8 py-2 rounded-[8px] border-solid border-[2px] border-[#1a64ad]">
        <img src={coppel1} alt="coppel1-img-head" />
        <p class="text-[25px] font-bold">Hola</p>
        <p class="text-[16px]">Estás a punto de terminar tu compra de</p>
        <p class="text-[16px] font-bold">Crédito Coppel Pay</p>
        <div class="flex flex-col">
          {/* inputs */}
          {/* AMOUNT */}
          <p class="text-[14px] text-[#818080]">Precio de contado:</p>
          <p class="text-[16px] font-bold">{`$${parseInt(
            props.checkout.userData.amount
          ).toLocaleString("es-MX", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`}</p>
          <div class="border-b-2 border-grey"></div>
          <p class="text-[14px] text-[#818080]">
            Recuerda que el monto máximo por transacción de Coppel Pay online es
            de $15,000
          </p>
          <div class="py-2"></div>
          {/* CREDIT */}
          <p class="text-[14px] text-[#818080]">
            Precio con crédito de Coppel Pay:
          </p>
          <div class="flex flex-row items-center">
            <p class="text-[16px] font-bold pr-2">{`$${(
              parseInt(props.checkout.userData.amount) * 1.43
            ).toLocaleString("es-MX", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}</p>
            <p class="text-[14px] text-[#818080]">en 12 mensualidades</p>
          </div>
          <div class="border-b-2 border-grey"></div>
          <div class="py-2"></div>
          {/* CUOTES */}
          <p class="text-[14px] text-[#818080]">Tu abono mensual será de:</p>
          <div class="flex flex-row items-center">
            <p class="text-[16px] font-bold pr-2">{`$${(
              (parseInt(props.checkout.userData.amount) * 1.43) /
              12
            ).toLocaleString("es-MX", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}</p>
            <p class="text-[14px] text-[#818080]">el día 24 de cada mes</p>
          </div>
          <div class="border-b-2 border-grey"></div>
          <div class="py-2"></div>
          {/* EMAIL */}
          <p class="text-[14px] text-[#818080]">
            Enviaremos tu recibo a este correo:
          </p>
          <p class="text-[16px] font-bold pr-2">{envVars.fixedEmail}</p>
          <div class="border-b-2 border-grey"></div>
          <div class="pb-8"></div>
          {/* ending texts */}
          <p class="text-[18px] font-bold">Finaliza tu compra</p>
          <p class="text-[16px] pt-1">
            Da clic en el botón para finalizar tu compra.
          </p>
          <p class="text-[16px]">
            Enviaremos tu recibo por correo. Recuerda revisar la bandeja de
            correo no deseado y promociones
          </p>
        </div>
        <button
          class="max-w-[200px] self-center rounded-[25px] h-[34px] mt-3 text-white bg-[#1a64ad] text-[18px] w-full"
          preventdefault:click
          onClick$={() => {
            checkoutSubmit(props.checkout.issuer.id);
          }}
          disabled={state.isLoading}
        >
          Pagar
        </button>
      </div>
    </>
  );
});
