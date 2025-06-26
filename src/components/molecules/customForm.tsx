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

      <div class="flex flex-col gap-1 text-sm sm:text-base md:text-lg h-full text-white">
      <div
          id="flux-white-container"
          class="flex items-center justify-center"
        >
          <div
            class={`mx-4 flex flex-col ${modelStylesData.form.gap} ${modelStylesData.form.padding} sm:mx-6 md:mx-8 w-full`}
          >
            <Text
              text={props.credilink.title}
              size={`${modelStylesData.textSize.title} text-2xl sm:text-3xl md:text-4xl`}
              weight={modelStylesData.textWeight.title}
              position={`place-content-center text-center`}
            />
            <Text
              text={props.credilink.description}
              size={`${modelStylesData.textSize.subtitle} text-base sm:text-lg md:text-xl`}
              weight={modelStylesData.textWeight.normal}
              position={`text-center`}
            />
            <Phone
              placeholder="Teléfono de Whatsapp"
              store={store}
              validationStore={validationStore}
              errorTextStyle="text-[10px] sm:text-[12px] md:text-[13px]"
            />
            <div id="flux-scroll-here" class="flex flex-col">
              <div class="h-1 sm:h-2 md:h-3"></div>
              <Amount
                placeholder="Monto de tu compra"
                store={store}
                validationStore={validationStore}
                min={props.credilink.min}
                max={props.credilink.max}
                errorTextStyle="text-[10px] sm:text-[12px] md:text-[13px]"
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
