import { component$ } from "@builder.io/qwik";
import mp1 from "../../../assets/login/mp1.png";
import mp2 from "../../../assets/login/mp2.png";
import { envVars } from "~/models/global-vars";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  console.log(props);
  return (
    <>
      <div class="flex flex-col place-content-center gap-6">
        <img src={mp1} alt="mp-top-image-logo" />
        <div class="px-4">
          <label for="email" class="text-[13px]">
            Teléfono, e-mail o usuario
          </label>
          <input
            class="rounded-[5px] h-[44px] p-3 border-solid border-[2px] border-[#02b1e9] w-full"
            placeholder={envVars.fixedEmail}
            disabled
          />
          <button
            class="rounded-[5px] h-[44px] mt-3 text-white bg-[#02b1e9] w-full"
            preventdefault:click
            onClick$={() => {
              props.checkout.isLoading = true;
              // console.log(props.checkout.isLoading)
              setTimeout(() => {
                props.checkout.isLoading = false;
                props.checkout.isLogin = false;
                props.checkout.isCheckout = true;
                // console.log(props.checkout.isLoading)
              }, 2000);
            }}
          >
            Continuar
          </button>
          <button class="rounded-[5px] h-[44px] mt-3 text-[#02b1e9] w-full">
            Crear cuenta
          </button>
        </div>
        <img class="pt-8" src={mp2} alt="mp-top-image-logo" />
      </div>
    </>
  );
});
