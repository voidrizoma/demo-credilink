import { component$} from "@builder.io/qwik";

export interface IProps {
  text: string;
  colorSecondary: string;
  store: any;
  submitData: ()=>void;
}

export default component$((props: IProps) => {

  return (
    <div class="flex place-content-center">
      <button
        class="text-white rounded-md border-none h-[40px] w-3/4"
        style={{background: props.colorSecondary}}
        onClick$={props.submitData}
      >
        {props.text}
      </button>
    </div>
  );
});
