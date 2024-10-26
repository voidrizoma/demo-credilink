import { component$ } from "@builder.io/qwik";
import { ImageCommerce } from "~/components/atoms/images/imageCommerce";
import { modelStylesData } from "~/models/modelStyles";

interface IProps {
    imgSrc: string;
}

export default component$((props: IProps) => {
  return <div
    id='header-container'
    class={`${modelStylesData.labelSize.width} ${modelStylesData.labelSize.height} ${modelStylesData.bgColor.fluxIndigo2}`}>
    <div id='header-subcontainer' class='flex justify-center items-center h-[inherit]'>
      <ImageCommerce url={props.imgSrc} />
    </div>
  </div>
});