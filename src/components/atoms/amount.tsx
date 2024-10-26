import { component$ } from "@builder.io/qwik";
import { isValidAmount, Validation } from "~/helpers/validation";
import { StoreData } from "~/models/store-data-model";
import Input from "./input";
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
  placeholder: string;
  color?: string;
  store: StoreData;
  validationStore: Validation;
  min: number;
  max: number;
  errorTextStyle: string;
}

export default component$((props: IProps) => {
  return (
    <Input>
      <input
        id="fluxqr-amount-input"
        name="fluxqr-amount-input"
        class={`direction-ltr w-full border-[1px] border-solid p-3 ${modelStylesData.input.height} ${modelStylesData.textSize.input} ${modelStylesData.input.border} ${modelStylesData.input.textColor} ${modelStylesData.input.bgColor}`}
        type="text"
        inputMode="decimal"
        pattern="^[0-9]+(\.[0-9]{1,2})?$"
        step=".01"
        placeholder={props.placeholder}
        value={props.store.amount}
        required
        onInput$={(ev) =>
          (props.store.amount = (ev.target as HTMLInputElement).value)
        }
        onFocus$={() => {
          setTimeout(() => {
            const el = document.getElementById(`flux-scroll-here`);
            el !== null && el.scrollIntoView();
          }, 1000);
        }}
        onBlur$={() => {
          if (props.store.amount.length > 0) {
            props.validationStore.validAmount = isValidAmount(
              props.min,
              props.max,
              props.store.amount,
            );
            props.store.amount = parseFloat(props.store.amount)
              .toFixed(2)
              .toString();
          }
        }}
      />
      <p
        class={`self-start ${
          !props.validationStore.validAmount ? "text-[#ff8800]" : "text-white"
        } ${props.errorTextStyle}`}
      >
        {!props.validationStore.validAmount
          ? `Ingresa un monto entre ${props.min} y ${props.max} pesos.`
          : "Tip: usa el monto exacto, con centavos si es necesario"}
      </p>
    </Input>
  );
});