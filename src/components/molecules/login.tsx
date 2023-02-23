import { component$ } from "@builder.io/qwik";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  return (
    <>
      <div class="flex w-[100%] place-content-center">
        <div class="flex flex-col place-content-center gap-6 rounded-md m-8 p-4 bg-[#f5f6fb]">
          <img
            class="pb-3 h-[15%]"
            src={issuerLogoFinder(props.checkout.issuer)}
            alt=""
          />

          <div class="flex flex-col gap-6 text-[20px] font-medium rounded p-3">
            {/* C1 */}
            <div>
              <label class="font-semibold" for="email">Email</label>
              <input
                class="rounded-[5px] h-[44px] p-3 border-solid border-[1px] border-black w-full"
                placeholder={props.checkout.userData.email || "user@company.com"}
                disabled
              />
            </div>

            {/* C2 */}
            <div>
              <label class="font-semibold" for="password">Contraseña</label>
              <input
                class="rounded-[5px] h-[44px] p-3 border-solid border-[1px] border-black w-full"
                value="password"
                type="password"
                disabled
                pattern=""
              />
            </div>

            {/* C3 */}

            <div class="flex place-content-center text-[16px] font-semibold pt-3">
              <button
                class="text-white rounded-[5px] border-none h-[40px] w-full"
                style={{
                  background: "#4ba3da",
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
                INICIAR SESIÓN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
