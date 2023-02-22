import { component$, $, useStore } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";
import { prepareMailData } from "~/helpers/mailDataGenerator";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>

  const state = useStore({
    currentRadio: "",
  });

  const checkoutSubmit = $(async (loanId: string) => {

    const expiresIn = new Date();
    expiresIn.setHours(23, 59, 59, 0).toLocaleString();
    const mailServiceUrl =
      "https://paywithflux-services-notifier-staging.services.k8s.fluxqr.net/";

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": mailServiceUrl,
    //   },
    // };

    try {
      await fetch(mailServiceUrl, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": mailServiceUrl,
        },
        body: prepareMailData(
          props.credilink,
          props.checkout,
          expiresIn.toString(),
          ""
        ),
      }).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          const { data } = await res.json();
          console.log("mailsent", JSON.stringify(data));
        }
      });
    } catch (err) {
      console.log(err);
    }
    window.location.href = `/?loan=${loanId}`;
  });

  return (
    <>
      <div class="flex w-[100%] place-content-center">
        <div class="flex flex-col gap-4 rounded m-8 p-4">
          <img
            class="pb-3 h-[10%]"
            src={issuerLogoFinder(props.checkout.issuer)}
            alt=""
          />

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
            class={`m-0 p-0 text-[${props.checkout.issuer.color}] font-bold text-[26px] text-blue-500`}
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
              <div class="px-2 text-[18px] font-bold text-blue-500">{`1 Quincena de $${
                parseFloat(props.checkout.userData.amount) * 0.8 +
                parseFloat(props.checkout.userData.amount) * 0.8 * (0.27 / 100)
              }`}</div>
            </div>
            <div class="flex flex-row text-[14px]">
              <div class="flex flex-auto p-2 border-t-4 border-r-4 border-b-0 border-l-0 border-[#c2c2c2] ">
                Tasa de interés: 0.27%
              </div>
              <div class="flex flex-auto p-2 border-t-4 border-r-0 border-b-0 border-l-0 border-[#c2c2c2]">
                {`Tasa de interés: $${
                  parseFloat(props.checkout.userData.amount) *
                  0.8 *
                  (0.27 / 100)
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
              <div class="px-2 text-[18px] font-bold text-blue-500">{`2 Quincenas de $${
                (parseFloat(props.checkout.userData.amount) * 0.8) / 2 +
                ((parseFloat(props.checkout.userData.amount) * 0.8) / 2) *
                  (0.27 / 100)
              }`}</div>
            </div>
          </div>

          <div class="flex flex-col border-4 border-[#c2c2c2] rounded-md">
            <div class="flex flex-row p-3">
              <div class="flex place-content-center">
                <input type="radio"
                  class="scale-[1.8]"
                  checked={state.currentRadio === "q3"}
                  onClick$={() => {
                    state.currentRadio = "q3";
                  }} />
              </div>
              <div class="px-2 text-[18px] font-bold text-blue-500">{`3 Quincenas de $${
                (parseFloat(props.checkout.userData.amount) * 0.8) / 3 +
                ((parseFloat(props.checkout.userData.amount) * 0.8) / 3) *
                  (0.27 / 100)
              }`}</div>
            </div>
          </div>

          <div class="flex place-content-center text-[20px] font-semibold pt-3">
            <button
              class="text-white rounded-[20px] border-none h-[40px] w-full"
              style={{ background: state.currentRadio?.length ? props.credilink.colorPrimary : "#c2c2c2" }}
              preventdefault:click
              onClick$={() => {
                checkoutSubmit(props.checkout.issuer.id);
              }}
              disabled={!state.currentRadio?.length}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
