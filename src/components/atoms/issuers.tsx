/* eslint-disable qwik/valid-lexical-scope */
import { component$, useStore } from "@builder.io/qwik";
// import { useLocation } from "@builder.io/qwik-city";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { Issuer } from "~/models/issuer-model";
import { StoreData } from "~/models/store-data-model";
import CustomText from "./customText";
import { Validation, isValidAmount, isValidPhone } from "~/helpers/validation";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";

export interface IProps {
  issuers: Issuer[];
  store: StoreData;
  validationStore: Validation;
  credilink: Credilink;
  checkout: CheckoutModel;
  submitData: () => void;
}

export default component$((props: IProps) => {
  // const location = useLocation();
  // const urlStore = useStore({ url: "" });
  const selected = useStore({ index: -1 });

  // if (location?.href?.length) {
  // Do the thing
  // console.log(`location is = ${location.href}`)
  //   urlStore.url = location.href;
  // }

  return (
    <>
      <div class="flex place-content-center">
        <CustomText text="Selecciona una opción:" size="16px" weight="700" />
      </div>
      <div class="flex justify-center flex-wrap self-center gap-10">
        {props.issuers.map((el: Issuer, elIndex) => (
          <button
            class={`flex border-2 place-content-center border-none ${
              elIndex !== selected?.index
                ? "hover:opacity-50 hover:scale-[1.05]"
                : "opacity-50 scale-[1.05]"
            }`}
            disabled={elIndex === selected?.index ? true : false}
            onClick$={() => {
              if (
                props.store.phone?.length > 0 &&
                props.store.amount?.length > 0
              ) {
                // props.validationStore.validEmail = isValidEmail(
                //   props.store.email
                // );
                props.validationStore.validPhone = isValidPhone(
                  props.store.phone
                );                
                props.validationStore.validAmount = isValidAmount(
                  props.credilink.min,
                  props.credilink.max,
                  props.store.amount
                );
                if (
                  // props.validationStore.validEmail &&
                  props.validationStore.validAmount &&
                  props.validationStore.validPhone
                ) {
                  selected.index = elIndex;
                  props.checkout.issuer = el;
                  props.checkout.userData = {
                    email: envVars.fixedEmail,
                    amount: props.store.amount,
                    phone: props.store.phone,
                  };
                  props.submitData();
                }
              } else {
                props.validationStore.validEmail = false;
                props.validationStore.validAmount = false;
                props.validationStore.validPhone = false;
              }
            }}
          >
            <div class="flex flex-col place-content-center shadow-[5px_5px_#0e0d0d] p-2 w-[150px] h-[150px] bg-white rounded-[15px]">
              <img class="flex p-1" src={issuerLogoFinder(el)} alt="" />
              <p class="flex text-center text-[14px] text-[#777171] p-1">
                {el.proposal}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
});
