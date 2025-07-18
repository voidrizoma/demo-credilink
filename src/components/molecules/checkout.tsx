import { component$, $, useStore } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "./modalLoading";
import { getExpDate } from "~/helpers/dates";

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
          await fetch(`${baseUrl}/giftcards`, {
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
              return;
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
        <div class="flex flex-col gap-4 rounded m-8 p-4">
          <div class="flex self-center w-[150px] h-[150px]">
            <img
              class="pb-3"
              src={issuerLogoFinder(props.checkout.issuer.name)?.img}
              alt=""
            />
          </div>

          <div class="text-[20px] font-medium grid grid-cols-2 gap-4 bg-[#f5f6fb] rounded border-[#ffffff] border-[1px] p-3">
            {/* C1 */}
            <div class="flex flex-col gap-3">
              <div>Con tu correo</div>
              <div>Vas a comprar en</div>
            </div>

            {/* C2 */}
            <div class="flex flex-col gap-3 text-end">
              <div>{props.checkout.userData.email}</div>
              <div>{props.credilink.commerceName}</div>
            </div>
          </div>

          {/* QUOTES */}
          <div class="font-bold text-[26px] m-0 p-0">
            Selecciona el plazo de tu crédito por
          </div>
          <div
            class={`m-0 p-0 text-[${props.checkout.issuer.color}] font-bold text-[26px]`}
          >{`$${parseFloat(props.checkout.userData.amount)}.00`}</div>

          <div class="flex flex-col border-4 border-[#c2c2c2] rounded-md">
            <div class="flex flex-row p-3">
              <div class="flex place-content-center">
                <input
                  type="radio"
                  class="scale-[1.8]"
                  checked={state.currentRadio === "q1"}
                  onClick$={() => {
                    state.currentRadio = "q1";
                  }}
                />
              </div>
              <div class="px-2 text-[18px] font-bold">{`1 Quincena de $${(
                parseFloat(props.checkout.userData.amount) +
                parseFloat(props.checkout.userData.amount) * (0.2)
              ).toFixed(2)}`}</div>
            </div>
            <div class="flex flex-row text-[14px]">
              <div class="flex flex-auto p-2 border-t-4 border-r-4 border-b-0 border-l-0 border-[#c2c2c2] ">
                Tasa de interés: 20%
              </div>
              <div class="flex flex-auto p-2 border-t-4 border-r-0 border-b-0 border-l-0 border-[#c2c2c2]">
                {`Tasa de interés: $${(parseFloat(props.checkout.userData.amount) *
                  0.2).toFixed(2)
                  }`}
              </div>
            </div>
          </div>

          <div class="flex flex-col border-4 border-[#c2c2c2] rounded-md">
            <div class="flex flex-row p-3">
              <div class="flex place-content-center">
                <input
                  type="radio"
                  class="scale-[1.8]"
                  checked={state.currentRadio === "q2"}
                  onClick$={() => {
                    state.currentRadio = "q2";
                  }}
                />
              </div>
              <div class="px-2 text-[18px] font-bold">{`2 Quincenas de $${(
                parseFloat(props.checkout.userData.amount) / 2 * 1.2
              ).toFixed(2)}`}</div>
            </div>
          </div>

          <div class="flex flex-col border-4 border-[#c2c2c2] rounded-md">
            <div class="flex flex-row p-3">
              <div class="flex place-content-center">
                <input
                  type="radio"
                  class="scale-[1.8]"
                  checked={state.currentRadio === "q3"}
                  onClick$={() => {
                    state.currentRadio = "q3";
                  }}
                />
              </div>
              <div class="px-2 text-[18px] font-bold">{`3 Quincenas de $${(
                parseFloat(props.checkout.userData.amount) / 3 * 1.2
              ).toFixed(2)}`}</div>
            </div>
          </div>

          <div class="flex place-content-center text-[20px] font-semibold pt-3">
            <button
              class="text-white rounded-[20px] border-none h-[40px] w-full"
              style={{
                background: state.currentRadio?.length
                  ? '#000'
                  : "#c2c2c2",
              }}
              preventdefault:click
              onClick$={() => {
                checkoutSubmit(props.checkout.issuer.id);
              }}
              disabled={state.isLoading || !state.currentRadio?.length}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
