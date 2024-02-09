import { component$ } from "@builder.io/qwik";
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
    content: string;
}

export const ImageQR = component$<IProps>((props) => {
  return (
    <>
        <img
          class={`self-center rounded-[5px] ${modelStylesData.imgSize.qr}`}
          src={props.content}
          alt="Logo"
          loading="lazy"
        />
    </>
  );
});