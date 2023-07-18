import { component$, useStore, $, useWatch$ } from "@builder.io/qwik";
import CustomText from "../atoms/customText";
import Email from "../atoms/email";
import Amount from "../atoms/amount";
import { Credilink } from "~/models/credilink-model";
import { initialStoreData, StoreData } from "~/models/store-data-model";
import {
  initValidation,
  isValidAmount,
  isValidEmail,
  Validation,
} from "~/helpers/validation";
import Logo from "../atoms/logo";
import Modal from "../atoms/modal2";
// import { envVars } from "~/models/global-vars";
import Issuers from "../atoms/issuers";
import LinkText from "../atoms/linkText";
import { CheckoutModel } from "~/models/checkout-model";
export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // const api = envVars.apiUrl;
  const store = useStore<StoreData>(initialStoreData);
  const validationStore = useStore<Validation>(initValidation);

  useWatch$(({ track }) => {
    const formState = track(() => store);
    if (formState.email?.length > 0 && !isValidEmail(formState.email)) {
      validationStore.validEmail = false;
    } else {
      validationStore.validEmail = true;
    }
    if (
      formState.amount?.length > 0 &&
      !isValidAmount(props.credilink.min, props.credilink.max, formState.amount)
    ) {
      validationStore.validAmount = false;
    } else {
      validationStore.validAmount = true;
    }
  });

  const submitData = $(async () => {
    console.log("SUBMIT OK");

    store.isLoading = true;

    setTimeout(() => {
      store.isLoading = false;
      props.checkout.isLogin = true;
    }, 2000);
  });

  //   const submitData$ = $(async () => {
  //   store.isLoading = true;
  //   store.commerce = props.credilink.commerce;
  //   store.issuer = props.credilink.issuer;

  //   setTimeout(async () => {
  //     const refreshToken =
  //       "F4GgY2dLYp3Y5Ca1XWoRL6tnqFN2NxwY8PCiQevklrowgcB8Vf9UBENbMTAH4NJS8vQCx6xyjMOERENpQSSsTdSRXYl1ZRShL9uZIXsC7o8Xii5wHdbrwzEGurhY0vdF";
  //     const reqBody = {
  //       grantType: "accessToken",
  //       refreshToken,
  //     };

  //     try {
  //       await fetch(`${api}auth/tokens/refreshToken`, {
  //         method: "POST",
  //         // mode: "no-cors",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify(reqBody),
  //       }).then(async (res) => {
  //         if (res.status === 200) {
  //           const { data } = await res.json();
  //           const dataCredit = {
  //             ...store,
  //             amount: parseFloat(store.amount) * 100,
  //           };

  //           await fetch(`${api}loans`, {
  //             method: "POST",
  //             headers: {
  //               "Content-type": "application/json",
  //               Authorization: `Bearer ${data.accessToken}`,
  //             },
  //             body: JSON.stringify(dataCredit),
  //           }).then(async (res) => {
  //             const { data } = await res.json();
  //             if (data.url?.length > 0) window.location.href = data.url;
  //           });
  //         } else {
  //           store.isLoading = false;
  //           store.error = "Ocurrió un error";
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, 2000);
  // });

  return (
    <>
      {(store.isLoading || store.error?.length > 0) && <Modal store={store} />}
      <div
        class="flex flex-col place-content-center rounded-[5px] pb-4 pt-4 gap-3"
        style={{ background: props.credilink.colorSecondary }}
      >
        <div class="flex place-content-center h-[80px]">
          {props.credilink.logo?.length > 0 ? (
            <Logo url={props.credilink.logo} />
          ) : (
            <CustomText text={props.credilink.commerceName} />
          )}
        </div>
        <div class="flex flex-col place-content-center bg-white h-[300px]">
          <CustomText
            text={props.credilink.title}
            color="black"
            size="24px"
            weight="800"
          />
          <div class="flex flex-col gap-1 px-6 pt-3 pb-1">
            <CustomText
              text={props.credilink.description}
              color="black"
              size="15px"
              weight="300"
            />
            <div class="flex flex-col gap-4 px-4 pb-1">
              <Email
                placeholder="Ingresa tu correo"
                store={store}
                validationStore={validationStore}
              />
              <div id="flux-scroll-here" class="flex flex-col">
                <div class="h-[10px]"></div>
                <Amount
                  placeholder="Monto del crédito"
                  store={store}
                  validationStore={validationStore}
                  min={props.credilink.min}
                  max={props.credilink.max}
                />
              </div>
            </div>
          </div>
        </div>
        {/* variable called "type" to change issuer's UI appearance */}
        <Issuers
          issuers={props.credilink.issuers}
          store={store}
          validationStore={validationStore}
          submitData={submitData}
          credilink={props.credilink}
          checkout={props.checkout}
        />
        <div
          class="py-0 my-0 mx-4 text-white text-[12px] font-[500]"
          style={{ borderTop: "1px solid" }}
        >
          <p class="text-white text-[12px] font-[500]">
            Servicio porporcionado por Flux QR.
          </p>

          <div class="flex flex-row gap-1">
            <div>Por favor lee nuestros</div>
            <LinkText
              text="Términos y
          Condiciones."
              url={props.credilink.tyc}
            />
          </div>
        </div>
      </div>
    </>
  );
});
