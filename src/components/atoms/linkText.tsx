import { component$ } from "@builder.io/qwik";

export interface IProps {
  text: string;
  url: string;
}

export default component$((props: IProps) => {
  return (
      <a href={props.url} target="_blank" class="text-white text-center text-xs sm:text-base underline underline-offset-1">
        {props.text}
      </a>
  );
});
