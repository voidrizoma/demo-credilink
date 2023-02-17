import { component$, $ } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>
  const checkoutSubmit = $(async (loanId: string) => {
    window.location.href = `/?loan=${loanId}`;
  });

  return (
    <>
      <div class="flex w-[100%] place-content-center">
        <div class="flex flex-col gap-8 rounded m-8 p-4">
          <img
            class="h-[10%]"
            src={issuerLogoFinder(props.checkout.issuer)}
            alt=""
          />

          <div class="text-[20px] font-medium grid grid-cols-2 gap-4 bg-[#f5f6fb] rounded border-[#ffffff] border-[1px] p-3">
            {/* C1 */}
            <div class="flex flex-col gap-3">
              <div>Con tu correo</div>
              <div>Vas a comprar en</div>
              <div>Monto de tu compra</div>
            </div>

            {/* C2 */}
            <div class="flex flex-col gap-3 text-end">
              <div>{props.checkout.userData.email}</div>
              <div>{props.credilink.commerceName}</div>
              <div
                class={`text-[${props.checkout.issuer.color}] font-bold text-[21px]`}
              >{`$${parseFloat(props.checkout.userData.amount)}.00`}</div>
            </div>
          </div>
          <div class="flex place-content-center text-[20px] font-semibold">
            <button
              class="text-white rounded-[20px] border-none h-[40px] w-full"
              style={{ background: props.credilink.colorPrimary }}
              onClick$={() => {
                checkoutSubmit(props.checkout.issuer.id);
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
