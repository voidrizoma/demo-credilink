import { component$ } from "@builder.io/qwik";

export interface IProps {
  text: string;
  color?: string;
}

export default component$((props: IProps) => {
  return (
    <p
      class="flex place-content-center text-center px-4 text-xs sm:text-base"
      style={{ color: props.color ?? "white" }}
    >
      {props.text}
    </p>
  );
});
