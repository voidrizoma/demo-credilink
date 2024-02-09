import { component$ } from "@builder.io/qwik";
import { ImageCommerce } from "~/components/atoms/images/imageCommerce";
import { modelStylesData } from "~/models/modelStyles";

interface IProps {
    imgSrc: string;
}

export default component$((props: IProps) => {
  return <div class={`absolute top-0 ${modelStylesData.labelSize.width} ${modelStylesData.labelSize.height} ${modelStylesData.bgColor.fluxIndigo2}`}>
  <div class='flex justify-center items-center h-[inherit]'>
      <ImageCommerce  url={props.imgSrc}/>
  </div>
</div>
});