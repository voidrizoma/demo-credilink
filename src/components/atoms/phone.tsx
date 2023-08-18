import { component$ } from "@builder.io/qwik";
import { isValidPhone, Validation } from "~/helpers/validation";
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
      <div class="flex flex-row gap-1">
        {/* <button class="bg-transparent text-black font-semibold py-2 px-4 border border-black rounded cursor-not-allowed">
          +52
        </button> */}
        <input
          type="number"
          autoComplete="true"
          class="rounded-[5px] h-[44px] p-3 border-solid border-[1px] border-black w-full"
          placeholder={props.placeholder}
          value={props.store.phone}
          onInput$={(ev) =>
            (props.store.phone = (ev.target as HTMLInputElement).value)
          }
          onBlur$={() => {
            if (props.store.phone?.length > 0) {
              if (!isValidPhone(props.store.phone)) {
                props.validationStore.validPhone = false;
              } else {
                props.validationStore.validPhone = true;
              }
            }
          }}
        />
      </div>
      <p
        class={`${
          !props.validationStore.validPhone ? "text-red-600" : "hidden"
        } text-[13px]`}
      >
        Ingresa un teléfono de al menos 10 digitos
      </p>
    </div>
  );
});
