import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import Amount from "../atoms/amount";
import { Text } from "../atoms/text";
import { Credilink } from "~/models/credilink-model";
import { initialStoreData, StoreData } from "~/models/store-data-model";
import {
  initValidation,
  isValidAmount,
  isValidPhone,
  Validation,
} from "~/helpers/validation";
import Modal from "../atoms/modal2";
import { CheckoutModel } from "~/models/checkout-model";
import Phone from "../atoms/phone";
import { modelStylesData } from "~/models/modelStyles";
import Issuers from "../atoms/issuers";

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  const store = useStore<StoreData>(initialStoreData);
  const validationStore = useStore<Validation>(initValidation);

  useTask$(({ track }) => {
    const formState = track(() => store);
    if (
      formState.amount?.length > 0 &&
      !isValidAmount(props.credilink.min, props.credilink.max, formState.amount)
    ) {
      validationStore.validAmount = false;
    } else {
      validationStore.validAmount = true;
    }

    if (formState.phone?.length > 0 && !isValidPhone(formState.phone)) {
      validationStore.validPhone = false;
    } else {
      validationStore.validPhone = true;
    }
  });

  const submitData = $(async () => {
    console.log("SUBMIT OK");

    store.isLoading = true;

    const selectedIssuer = store.issuer;
    console.log(selectedIssuer)

    if (selectedIssuer) {
      console.log("➡️ Seleccionado:", selectedIssuer.name);

      props.checkout.issuer = selectedIssuer;
      props.checkout.isCheckout = true;

      props.checkout.userData = {
        phone: store.phone,
        amount: store.amount,
        email: store.email || "user@example.com", // fallback por si no se pidió email aún
      };

      console.log("➡️ Checkout activado", props.checkout);
    } else {
      console.warn("⚠️ No se ha seleccionado un issuer");
    }

    setTimeout(() => {
      store.isLoading = false;
    }, 2000);
  });

  return (
    <>
      {(store.isLoading || store.error?.length > 0) && <Modal store={store} />}

      <div class="flex flex-col gap-[1px] text-[8px] h-[100%] text-white">
        <div
          id="flux-white-container"
          class="flex items-center justify-center pb-3"
        >
          <div
            class={`mx-4 flex flex-col ${modelStylesData.form.gap} ${modelStylesData.form.padding}`}
          >
            <Text
              text={props.credilink.title}
              size={modelStylesData.textSize.title}
              weight={modelStylesData.textWeight.title}
              position={`place-content-center text-center`}
            />
            <Text
              text={props.credilink.description}
              size={modelStylesData.textSize.subtitle}
              weight={modelStylesData.textWeight.normal}
              position={`text-center`}
            />
            <Phone
              placeholder="Teléfono de Whatsapp"
              store={store}
              validationStore={validationStore}
              errorTextStyle="text-[10px] sc300:text-[12px] sc400:text-[13px]"
            />
            <div id="flux-scroll-here" class="flex flex-col">
              <div class="h-[5px]"></div>
              <Amount
                placeholder="Monto de tu compra"
                store={store}
                validationStore={validationStore}
                min={props.credilink.min}
                max={props.credilink.max}
                errorTextStyle="text-[10px] sc300:text-[12px] sc400:text-[13px]"
              />
            </div>
          </div>
        </div>

        {props.credilink && props.credilink.issuers.length > 0 && (
          <Issuers
            issuers={props.credilink.issuers}
            store={store}
            validationStore={validationStore}
            submitData={submitData}
            credilink={props.credilink}
            checkout={props.checkout}
          />
        )}
      </div>
    </>
  );
});
