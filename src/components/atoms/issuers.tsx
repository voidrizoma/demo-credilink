/* eslint-disable qwik/valid-lexical-scope */
import { component$, useStore } from "@builder.io/qwik";
// import { useLocation } from "@builder.io/qwik-city";
import { issuerFinder } from "~/helpers/issuer-methods";
import { Issuer } from "~/models/issuer-model";
import { StoreData } from "~/models/store-data-model";
import { Text } from "./text";
import { Validation, isValidAmount, isValidPhone } from "~/helpers/validation";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { modelStylesData } from "~/models/modelStyles";
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
  const selected = useStore({ index: -1 });

  return (
    <div class="flex flex-col border-b-1 pb-1 sc600:w-[600px]">
      <Text
        text="Selecciona una opción:"
        color="text-white"
        weight="font-bold"
        size={modelStylesData.textSize.subtitle}
        padding="py-2 sc300:[py-4]"
      />
      <div class="flex place-content-center">
        <input
          id="auxInput"
          class={`z-[-1] h-1 w-1 self-center justify-self-center bg-transparent`}
          style={{ color: props.credilink.colorPrimary }}
          type="text"
          placeholder="."
          onFocus$={() => {
            const auxInput = document.getElementById("auxInput");
            auxInput?.blur();
          }}
        />
      </div>
      <div
        id="flux-issuers"
        class={props.issuers.length == 4 ? "grid grid-cols-2 gap-[8px] self-center sc300:gap-[10px] sc400:gap-[14px]" : "flex flex-wrap justify-center gap-[8px] self-center sc300:gap-[10px] sc400:gap-[14px]"}
      >
        {props.issuers.map((el: Issuer, elIndex) => (
          <button
            key={`issuer-btn-${el}`}
            id={`issuer-btn-${elIndex}`}
            class={`flex place-content-center border-2 border-none ${elIndex !== selected.index
              ? "hover:scale-[1.05] hover:opacity-50"
              : "scale-[1.05] opacity-50"
              }`}
            disabled={elIndex === selected.index ? true : false}
            onClick$={() => {
              if (
                props.store.phone?.length > 0 &&
                props.store.amount?.length > 0
              ) {
                props.validationStore.validPhone = isValidPhone(
                  props.store.phone
                );
                props.validationStore.validAmount = isValidAmount(
                  props.credilink.min,
                  props.credilink.max,
                  props.store.amount
                );
                if (
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
            <img
              id={`issuer-btn-img-${issuerFinder(el.name)?.name}`}
              class={`${modelStylesData.issuerBtn.imgHeight}`}
              src={issuerFinder(el.name)?.img}
              alt="issuer-logo-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
});
