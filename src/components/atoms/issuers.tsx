/* eslint-disable qwik/valid-lexical-scope */
import { component$, useStore } from "@builder.io/qwik";
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
    <div class="flex flex-col border-b border-gray-700 pb-1 sc600:w-[600px]">
      <Text
        text="Selecciona una opción:"
        color="text-white"
        weight="font-bold"
        size={modelStylesData.textSize.subtitle}
        padding="py-2 sc300:py-4"
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
        class="grid grid-cols-2 gap-4 justify-items-center"
        style={{
          gridTemplateRows: `repeat(auto-fill, minmax(120px, 1fr))`,
        }}
      >
        {props.issuers.map((el: Issuer, elIndex) => (
          <button
            key={`issuer-btn-${el.name}-${elIndex}`}
            id={`issuer-btn-${el.name}-${elIndex}`}
            class={`flex items-center justify-center border-2 border-transparent rounded-md transition-transform duration-200
              ${elIndex !== selected.index
                ? "hover:scale-105 hover:opacity-50"
                : "scale-105 opacity-50 border-yellow-400"
              }`}
            disabled={elIndex === selected.index}
            style={{
              gridColumn:
                props.issuers.length % 2 === 1 && // si cantidad impar
                elIndex === props.issuers.length - 1
                  ? "1 / span 2" // último botón ocupa 2 columnas (centrado)
                  : "auto",
            }}
            onClick$={() => {
              if (props.store.phone?.length > 0 && props.store.amount?.length > 0) {
                props.validationStore.validPhone = isValidPhone(props.store.phone);
                props.validationStore.validAmount = isValidAmount(
                  props.credilink.min,
                  props.credilink.max,
                  props.store.amount
                );
                if (props.validationStore.validAmount && props.validationStore.validPhone) {
                  selected.index = elIndex;
            
                  props.store.issuer = el; // ✅ <--- ESTA LÍNEA ES CLAVE
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
              key={`issuer-btn-img-${issuerFinder(el.name)?.name}`}
              class={`${modelStylesData.issuerBtn.imgHeight} select-none`}
              src={issuerFinder(el.name)?.img}
              alt="issuer-logo-image"
              height={50}
              width={200}
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
});
