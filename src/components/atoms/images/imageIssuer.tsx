import { component$ } from "@builder.io/qwik";
import { modelStylesData } from "~/models/modelStyles";

export interface IProps {
    dir: string;
}

export const ImageIssuer = component$<IProps>((props) => {
  return (
    <>
        <img
          class={`self-center rounded-[5px] ${modelStylesData.imgSize.issuer}`}
          src={props.dir}
          alt="IssuerLogo"
          loading="lazy"
        />
    </>
  );
});