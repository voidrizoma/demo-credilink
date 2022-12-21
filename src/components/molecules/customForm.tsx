import { component$, useStore, $, useWatch$ } from "@builder.io/qwik";
import Btn from "../atoms/btn";
import CustomText from "../atoms/customText";
import CustomTitle from "../atoms/customTitle";
import Email from "../atoms/email";
import Amount from "../atoms/amount";
import axios from "axios";
import { Credilink } from "~/models/credilink-model";
import { initialUserData, UserData } from "~/models/user-data-model";
import {
  initValidation,
  isValidAmount,
  isValidEmail,
  Validation,
} from "~/helpers/validation";

export interface IProps {
  credilink: Credilink;
}


const api = "https://flux-api-six.vercel.app"

export default component$((props: IProps) => {
  const store = useStore<UserData>(initialUserData);
  const validationStore = useStore<Validation>(initValidation);

  useWatch$(({ track }) => {
    const formState = track(() => store);
    if (formState.email?.length && !isValidEmail(formState.email)) {
      validationStore.validEmail = false;
    } else {
      validationStore.validEmail = true;
    }
    if (
      formState.amount?.length &&
      !isValidAmount(props.credilink.min, props.credilink.max, formState.amount)
    ) {
      validationStore.validAmount = false;
    } else {
      validationStore.validAmount = true;
    }
  });

  const submitData = $(() => {
    store.commerce = props.credilink.commerce;
    store.issuer = props.credilink.issuer;

    const refreshToken =
      "F4GgY2dLYp3Y5Ca1XWoRL6tnqFN2NxwY8PCiQevklrowgcB8Vf9UBENbMTAH4NJS8vQCx6xyjMOERENpQSSsTdSRXYl1ZRShL9uZIXsC7o8Xii5wHdbrwzEGurhY0vdF";
    const reqBody = {
      grantType: "accessToken",
      refreshToken,
    };
    const headers1 = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${api}/auth/tokens/refreshToken`, reqBody, headers1)
      .then((res) => {
        console.log("POST TOKEN");
        // 2nd REQ to post: generate QR and send email
        const token = res.data.data.accessToken;
        const headers2 = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // "X-Referer": window.location.href,
          },
        };
        const dataCredit = {
          ...store,
          amount: parseFloat(store.amount) * 100,
        };
        axios
          .post(`${api}/loans`, dataCredit, headers2)
          .then((res) => {
            console.log("POST QR");
            const url = res?.data;
            console.log(res.data);
            console.log(url);
            // window.location.replace(url);
            if (url?.length) window.location.href = url;
          });
      });
  });

  return (
    <div class="flex flex-col place-content-center rounded-[20px] m-6 p-8 gap-6 bg-white">
      <CustomTitle
        title={props.credilink.title}
        color={props.credilink.colorSecondary}
      />
      <CustomText text={props.credilink.description} color="black" />
      <Email
        placeholder="Correo electrónico"
        store={store}
        validationStore={validationStore}
      />
      <Amount
        placeholder="Monto"
        store={store}
        validationStore={validationStore}
        min={props.credilink.min}
        max={props.credilink.max}
      />
      <Btn
        text="!Quiero mi crédito¡"
        store={store}
        validationStore={validationStore}
        bgColor={props.credilink.colorPrimary}
        submitData={submitData}
      />
    </div>
  );
});
