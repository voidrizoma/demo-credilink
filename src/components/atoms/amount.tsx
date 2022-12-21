import { component$ } from "@builder.io/qwik";
import { isValidAmount, Validation } from "~/helpers/validation";
import { UserData } from "~/models/user-data-model";

export interface IProps {
  placeholder: string;
  color?: string;
  store: UserData;
  validationStore: Validation;
  min: number;
  max: number;
}

export default component$((props: IProps) => {
  return (
    <div class="flex flex-col gap-2 place-content-center">
      <input
        class="rounded-md h-[40px] p-3 w-full border-solid border-2"
        type="number"
        placeholder={props.placeholder}
        value={props.store.amount}
        onInput$={(ev) =>
          (props.store.amount = (ev.target as HTMLInputElement).value)
        }
        onBlur$={() => {
          if (props.store.amount?.length) {
            if (!isValidAmount(props.min, props.max, props.store.amount)) {
              props.validationStore.validAmount = false;
            } else {
              props.validationStore.validAmount = true;
            }
          }
        }}
      />
      {!props.validationStore.validAmount && (
        <p class="text-red-600">{`Ingresa un monto entre ${props.min} y ${props.max} pesos, que sea múltiplo de 100`}</p>
      )}
    </div>
  );
});
