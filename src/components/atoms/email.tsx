import { component$ } from "@builder.io/qwik";
import { isValidEmail, Validation } from "~/helpers/validation";
import { StoreData } from "~/models/store-data-model";

export interface IProps {
  placeholder: string;
  color?: string;
  store: StoreData;
  validationStore: Validation;
}

export default component$((props: IProps) => {
  return (
    <div class="flex flex-col gap-2 place-content-center">
      <input
        class="rounded-[5px] h-[44px] p-3 border-solid border-[1px] border-black w-full"
        placeholder={props.placeholder}
        value={props.store.email}
        onInput$={(ev) =>
          (props.store.email = (ev.target as HTMLInputElement).value)
        }
        onBlur$={() => {
          if (props.store.email?.length > 0) {
            if (!isValidEmail(props.store.email)) {
              props.validationStore.validEmail = false;
            } else {
              props.validationStore.validEmail = true;
            }
          }
        }}
      />
      {!props.validationStore.validEmail && (
        <p class="text-red-600">Correo inválido</p>
      )}
    </div>
  );
});
