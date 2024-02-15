import { component$ } from "@builder.io/qwik";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";

export interface IProps {
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  return (
    <>
      <div class="flex w-[100%] place-content-center">
        <div class="flex flex-col place-content-center gap-6 rounded-md m-8 p-4">
          <div class="flex self-center w-[150px] h-[150px]">
            <img
              class="pb-3"
              src={issuerLogoFinder(props.checkout.issuer)}
              alt=""
            />
          </div>

          <div class="flex flex-col gap-6 text-[20px] font-medium rounded p-3">
            {/* C1 */}
            <div>
              <label class="text-[14px]" for="email">
                Número celular
              </label>
              <input
                class="text-[13px] rounded-[25px] h-[44px] p-3 border-solid border-[1px] border-[#78909c] w-full"
                placeholder={props.checkout.userData.phone}
                disabled
              />
            </div>

            {/* C2 */}
            <div>
              <label class="text-[14px]" for="password">
                Contraseña
              </label>
              <input
                class="text-[13px] rounded-[25px] h-[44px] p-3 border-solid border-[1px] border-[#78909c] w-full"
                value="password"
                type="password"
                disabled
                pattern=""
              />
            </div>

            {/* C3 */}

            <div class="flex place-content-center text-[16px] font-semibold pt-3">
              <button
                class="text-white rounded-[25px] border-none h-[40px] w-full"
                style={{
                  background: "#000",
                }}
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
                CONTINUAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
