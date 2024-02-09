import { component$ } from "@builder.io/qwik";
import { isValidPhone, Validation } from "~/helpers/validation";
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
        maxLength={10}
        minLength={10}
        class={`w-full border-[1px] border-solid p-3 ${modelStylesData.input.height} ${modelStylesData.textSize.input} ${modelStylesData.input.border} ${modelStylesData.input.textColor} ${modelStylesData.input.bgColor}`}
        placeholder={props.placeholder}
        value={props.store.phone}
        onInput$={(ev) =>
          (props.store.phone = (ev.target as HTMLInputElement).value)
        }
        onBlur$={() => {
          if (props.store.phone.length > 0) {
            props.validationStore.validPhone = isValidPhone(props.store.phone);
          }
        }}
      />
      <p
        class={`${
          !props.validationStore.validPhone ? "text-red-600" : "hidden"
        } ${props.errorTextStyle}`}
      >
        Ingresa un teléfono de al menos 10 digitos
      </p>
    </Input>
  );
});
