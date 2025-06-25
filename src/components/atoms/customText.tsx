import { component$ } from "@builder.io/qwik";

export interface IProps {
  text: string;
  color?: string;
  size?: string;
  weight?: string;
}

export default component$((props: IProps) => {
  return (
    <p
      class={`flex place-content-center text-center px-2`}
      style={{ color: props.color ?? "white", fontWeight: props.weight ?? "600", fontSize: props.size ?? "14px"}}
    >
      {props.text}
    </p>
  );
});
