import { component$ } from "@builder.io/qwik";

export interface IProps {
  title: string;
  color: string;
}

export default component$((props: IProps) => {
  return (
      <p class="flex place-content-center"
      style={{ color: props.color }}
      >{props.title}</p>
  );
});
