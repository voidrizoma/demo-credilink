import { component$ } from "@builder.io/qwik";
import { modelStylesData } from "~/models/modelStyles";

interface IProps {
  name: string;
}

export default component$<IProps>(({ name }) => {
  return (
    <div
      class={`absolute top-0 ${modelStylesData.labelSize.width} ${modelStylesData.labelSize.height} ${modelStylesData.bgColor.fluxIndigo}`}
    >
      <div class="flex h-[inherit] items-center justify-center">
        <p class="flex items-center justify-center text-center text-[22px] font-bold text-white">
          {name.toLocaleUpperCase()}
        </p>
      </div>
    </div>
  );
});
