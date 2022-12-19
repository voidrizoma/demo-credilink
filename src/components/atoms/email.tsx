import { component$ } from "@builder.io/qwik";
import { isValidEmail, Validation } from "~/helpers/validation";
import { UserData } from "~/models/user-data-model";

export interface IProps {
  placeholder: string;
  color?: string;
  store: UserData;
  validationStore: Validation;
}

export default component$((props: IProps) => {
  return (
    <div class="flex flex-col gap-2 place-content-center">
      <input
        class="rounded-md h-[40px] p-3 border-solid border-2 w-full"
        placeholder={props.placeholder}
        value={props.store.email}
        onInput$={(ev) =>
          (props.store.email = (ev.target as HTMLInputElement).value)
        }
        onBlur$={() => {
          if (props.store.email?.length) {
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
