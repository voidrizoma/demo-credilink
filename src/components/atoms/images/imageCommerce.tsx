import { component$ } from "@builder.io/qwik";
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
    url?: string;
    dir?: string;
    redirect?: string;
}

export const ImageCommerce = component$<IProps>((props) => {
  return (
    <>
        <img
          class={`self-center rounded-[5px] ${modelStylesData.imgSize.commerce}`}
          src={props.url || props.dir}
          alt="Logo"
          loading="lazy"
        />
    </>
  );
});