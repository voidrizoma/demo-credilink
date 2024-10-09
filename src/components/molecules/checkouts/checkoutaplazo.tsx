import { component$, $, useStore } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import { getExpDate, getFuturePaymentDate } from "../../../helpers/dates";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>
  const state = useStore({
    currentRadio: "",
    isLoading: false,
  });

  const checkoutSubmit = $(async (loanId: string) => {
    state.isLoading = true;
    // const expiresIn = new Date();
    // expiresIn.setHours(23, 59, 59, 0).toLocaleString();

    try {
      const baseUrl = envVars.apiUrlFlux;
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
      await fetch(`${baseUrl}coupons`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Important for JSON requests
        },
        body: JSON.stringify(dataCoupon),
      }).then(async (res) => {
        const data = await res.json();
        console.log("DATA :::::::::: ", data)
        if (data?.id?.length) {
          console.log(data.id)
          window.location.href = `/?loan=${data.id}`;
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
          window.location.href = `/?loan=${data.id}`;
        } else {
          window.location.href = `/?loan=${loanId}`;
          return;
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {state.isLoading && <ModalLoading />}
      <div class="flex w-[100%] place-content-center">
        <div class="flex flex-col gap-1 rounded m-2 p-2 min-w-[360px]">
          <div class="flex self-center w-[120px] h-[120px]">
            <img
              class="pb-3 max-w-[150px]"
              src={issuerLogoFinder(props.checkout.issuer)}
              alt=""
            />
          </div>
          {/* QUOTES */}
          <div class="rounded overflow-hidden shadow p-4">
            <div class="flex justify-between m-0 p-0">
              <p class="font-bold text-[16px] text-[#000]">
                Confirma tu compra (IVA icl.)
              </p>
              <p class="font-bold text-[16px] text-[#000]">{`$${parseFloat(
                props.checkout.userData.amount
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex justify-between m-0 py-3">
              <p class="font-bold text-[16px] text-[#9c9c9c]">
                Comisión por servicio
              </p>
              <p class="font-bold text-[16px] text-[#9c9c9c]">{`$${(
                parseFloat(props.checkout.userData.amount) * 0.16
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex-grow border-t border-[##9c9c9c] py-2"></div>
            <div class="flex justify-between m-0 p-0">
              <p class="font-bold text-[18px] text-[#000]">Total a pagar</p>
              <p class="font-bold text-[18px] text-[#000]">{`$${(
                parseFloat(props.checkout.userData.amount) * 1.16
              ).toFixed(2)}`}</p>
            </div>
          </div>

          <p class="px-4 font-bold text-[16px] text-[#000] py-4">
            TU PLAN DE PAGOS
          </p>

          <div class="rounded overflow-hidden shadow p-4 font-bold text-[16px] text-[#000]">
            <div class="flex justify-between pb-3">
              <div class="flex items-center gap-4">
                <div class="h-[10px] w-[10px] bg-blue-600 rounded-[50%]"></div>
                <p class="p-0 m-0">Hoy</p>
              </div>
              <p>{`$${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex justify-between pb-3 text-[#a5a5a5]">
              <div class="flex items-center gap-4">
                <div class="h-[10px] w-[10px] bg-none rounded-[50%] border-[1px] border-[#a5a5a5]"></div>
                <p class="p-0 m-0">{getFuturePaymentDate(15)}</p>
              </div>
              <p>{`$${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex justify-between pb-3 text-[#a5a5a5]">
              <div class="flex items-center gap-4">
                <div class="h-[10px] w-[10px] bg-none rounded-[50%] border-[1px] border-[#a5a5a5]"></div>
                <p class="p-0 m-0">{getFuturePaymentDate(30)}</p>
              </div>
              <p>{`$${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex justify-between pb-3 text-[#a5a5a5]">
              <div class="flex items-center gap-4">
                <div class="h-[10px] w-[10px] bg-none rounded-[50%] border-[1px] border-[#a5a5a5]"></div>
                <p class="p-0 m-0">{getFuturePaymentDate(45)}</p>
              </div>
              <p>{`$${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}</p>
            </div>
            <div class="flex justify-between pb-3 text-[#a5a5a5]">
              <div class="flex items-center gap-4">
                <div class="h-[10px] w-[10px] bg-none rounded-[50%] border-[1px] border-[#a5a5a5]"></div>
                <p class="p-0 m-0">{getFuturePaymentDate(60)}</p>
              </div>
              <p>{`$${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}</p>
            </div>
          </div>

          <div class="flex place-content-center text-[14px] pt-3">
            <button
              class="text-white rounded-[16px] border-none h-[40px] w-full bg-black"
              preventdefault:click
              onClick$={() => {
                checkoutSubmit(props.checkout.issuer.id);
              }}
              disabled={state.isLoading}
            >
              {`REALIZAR PRIMER PAGO $${(
                (parseFloat(props.checkout.userData.amount) * 1.16) /
                5
              ).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
