import { component$ } from "@builder.io/qwik";
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
  url?: string;
}

export default component$((props: IProps) => {
  return (
    <>
      <img
        class={`self-center rounded-[5px] ${modelStylesData.imgSize.qr}`}
        src={props.url}
        alt="Logo"
        loading="lazy"
      />
    </>
  );
});
