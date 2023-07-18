import { component$ } from "@builder.io/qwik";
import { isValidAmount, Validation } from "~/helpers/validation";
import { StoreData } from "~/models/store-data-model";

export interface IProps {
  placeholder: string;
  color?: string;
  store: StoreData;
  validationStore: Validation;
  min: number;
  max: number;
}

export default component$((props: IProps) => {
  return (
    <div class="flex flex-col gap-2 place-content-center">
      <input
        class="rounded-[5px] h-[44px] p-3 border-solid border-[1px] border-black w-full"
        type="number"
        placeholder={props.placeholder}
        value={props.store.amount}
        onInput$={(ev) =>
          (props.store.amount = (ev.target as HTMLInputElement).value)
        }
        onFocus$={() => {
          setTimeout(() => {
            const el = document?.getElementById(`flux-scroll-here`);
            el !== null && el?.scrollIntoView();
          }, 1000);
        }}
        onBlur$={() => {
          if (props.store.amount?.length > 0) {
            if (!isValidAmount(props.min, props.max, props.store.amount)) {
              props.validationStore.validAmount = false;
            } else {
              props.validationStore.validAmount = true;
            }
          }
        }}
      />

      <p
        class={`${
          !props.validationStore.validAmount ? "text-red-600" : "hidden"
        } text-[13px]`}
      >{`Ingresa un monto entre ${props.min} y ${props.max} pesos, que sea múltiplo de 100`}</p>
    </div>
  );
});
