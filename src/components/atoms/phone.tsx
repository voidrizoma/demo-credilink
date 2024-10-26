import { component$ } from "@builder.io/qwik";
import { cleanPhoneNumber, isValidPhone, Validation } from "~/helpers/validation";
import { modelStylesData } from "~/models/modelStyles";
import { StoreData } from "~/models/store-data-model";
import Input from "./input";

export interface IProps {
  placeholder: string;
  color?: string;
  store: StoreData;
  validationStore: Validation;
  errorTextStyle: string;
}
export default component$((props: IProps) => {
  return (
    <Input>
      <input
        id="fluxqr-phone-input"
        name="phone"
        type="tel"
        autoComplete="true"
        minLength={10}
        class={`direction-ltr w-full border-[1px] border-solid p-3 ${modelStylesData.input.height} ${modelStylesData.textSize.input} ${modelStylesData.input.border} ${modelStylesData.input.textColor} ${modelStylesData.input.bgColor}`}
        placeholder={props.placeholder}
        value={props.store.phone}
        // onInput$={(ev) =>
        //   (props.store.phone = (ev.target as HTMLInputElement).value)
        // }
        onBlur$={(ev: any) => {
          const cleaned = cleanPhoneNumber(ev["target"]["value"]);
          if (cleaned.length > 0) {
            ev["target"]["value"] = cleaned;
            props.store.phone = cleaned;
            props.validationStore.validPhone = isValidPhone(props.store.phone);
          }
        }}
      // onBlur$={() => {
      //   if (props.store.phone.length > 0) {
      //     props.validationStore.validPhone = isValidPhone(props.store.phone);
      //   }
      // }}
      />
      <p
        class={`self-start ${!props.validationStore.validPhone ? "text-[#ff8800]" : "text-white"
          } ${props.errorTextStyle}`}
      >
        {!props.validationStore.validPhone
          ? `Ingresa un teléfono de al menos 10 digitos`
          : "La aprobación de tu crédito te llegará por WhatsApp"}
      </p>
    </Input>
  );
});
