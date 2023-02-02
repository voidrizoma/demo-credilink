import { component$ } from "@builder.io/qwik";
import { Validation } from "~/helpers/validation";
import { UserData } from "~/models/user-data-model";

export interface IProps {
  text: string;
  bgColor: string;
  store: UserData;
  validationStore: Validation;
  submitData: () => void;
}

export default component$((props: IProps) => {
  return (
    <div class="flex place-content-center">
      {props.store.email?.length &&
      props.store.amount?.length &&
      props.validationStore.validEmail &&
      props.validationStore.validAmount ? (
        <button
          class="text-white rounded-md border-none h-[40px] w-full"
          style={{ background: props.bgColor }}
          onClick$={props.submitData}
        >
          {props.text}
        </button>
      ) : (
        <button class="text-white rounded-md border-none h-[40px] w-full bg-slate-400">
          {props.text}
        </button>
      )}
    </div>
  );
});
