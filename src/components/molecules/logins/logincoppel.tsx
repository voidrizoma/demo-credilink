import { component$ } from "@builder.io/qwik";
import coppel1 from "../../../assets/login/coppel1.png";
import coppel2 from "../../../assets/login/coppel2.png";
import { envVars } from "~/models/global-vars";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  console.log(props);
  return (
    <>
      <div class="flex flex-col align-center my-4">
        <div class="flex flex-col align-center gap-6 m-6 px-4 pb-6 rounded-[8px] border-solid border-[2px] border-[#1a64ad]">
          <img
            class="max-w-[500px] self-center"
            src={coppel1}
            alt="coppel-img-1"
          />
          <div class="flex items-center border-b border-grey py-2">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder={envVars.fixedEmail}
              disabled
            />
          </div>
          <div class="flex items-center border-b border-grey py-2">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value="password"
              type="password"
              disabled
              pattern=""
            />
          </div>
          <p class="self-center font-semibold text-[#1a64ad] underline">
            ¿Olvidaste tu contraseña?
          </p>
          <button
            class="max-w-[200px] self-center rounded-[25px] h-[34px] mt-3 text-white bg-[#1a64ad] text-[18px] w-full"
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
            Iniciar sesión
          </button>
          <p class="self-center font-semibold text-[#02b1e9] underline">
            Conoce qué necesitas para usar Coppel Pay.
          </p>
        </div>
        <img class="self-center max-w-[400px]" src={coppel2} alt="coppel2-img" />
      </div>
    </>
  );
});
