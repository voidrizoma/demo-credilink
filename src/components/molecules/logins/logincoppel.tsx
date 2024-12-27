import { component$ } from "@builder.io/qwik";
import { envVars } from "~/models/global-vars";
import { CheckoutModel } from "~/models/checkout-model";
import coppelLogo from "~/assets/coppel.svg"
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  console.log(props);
  return (
    <>
      <div class="flex flex-col align-center my-4">
        <div class="flex flex-col align-center max-w-[400px] gap-6 m-2 px-4 pb-2 rounded-[8px]">
          <header class="mb-10 text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <img
                class="max-w-[200px] self-start"
                src={coppelLogo}
                alt="coppel-img-1"
              />
            </div>
            <p class="text-[#003B7A] text-sm m-0">
              Tu mismo crédito, más posibilidades.
            </p>
          </header>
          <h1 class={`mb-4 ${modelStylesData.textWeight.subTitle} ${modelStylesData.textSize.biggest}`}>
            Inicia sesión para realizar tu compra
          </h1>

          <p class={`mb-6 ${modelStylesData.textSize.subtitle}`}>
            Escribe el correo electrónico de tu cuenta digital Coppel o tu número de cliente
          </p>

          <div class={`mb-6 ${modelStylesData.textSize.subtitle} text-[#808080]`}>
            <label class="block mb-2">
              Correo electrónico o número de cliente
            </label>
            <input
              type="text"
              class="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] focus:border-transparent"
              placeholder={envVars.fixedEmail}
              disabled
            />
          </div>
          <button
            class="max-w-[200px] self-center rounded-[25px] h-[34px] mt-3 text-white bg-[#1a64ad] text-[18px] w-full"
            preventdefault:click
            onClick$={() => {
              props.checkout.isLoading = true;
              setTimeout(() => {
                props.checkout.isLoading = false;
                props.checkout.isLogin = false;
                props.checkout.isCheckout = true;
              }, 2000);
            }}
          >
            Continuar
          </button>
          <p class="self-center font-semibold text-[#1a64ad]">
            Conoce Coppel Pay.
          </p>
        </div>
      </div>
    </>
  );
});
