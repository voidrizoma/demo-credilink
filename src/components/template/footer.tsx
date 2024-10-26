import { component$ } from "@builder.io/qwik";
import { Text } from "../atoms/text";
import { modelStylesData } from "~/models/modelStyles";

interface IProps {
  isSlug: boolean;
}

export default component$((props: IProps) => {
  return (
    <div
      class={`flex h-full text-white ${modelStylesData.labelSize.width} ${modelStylesData.labelSize.height}`}
      style={{ borderTop: "1px solid" }}
    >
      <div class="flex w-full items-center justify-center">
        {!props.isSlug && (
          <div class="flex flex-row gap-1">
            <p class="flex items-center pl-4" id="flux-footer-text">
              Servicio proporcionado por
            </p>
            <a
              href="/demo"
              target="_self"
              class="flex text-center underline underline-offset-1"
            >
              Flux QR.
            </a>
          </div>
        )}

        {props.isSlug && (
          <div
            id="flux-footer-text-scroll"
            class={`mx-4 my-0 h-[100%] w-[100%] py-0 ${modelStylesData.textSize.normal} font-[500] text-white`}
          >
            <Text
              text="Servicio proporcionado por Flux QR."
              margin="mt-2"
              color="text-white"
              weight={modelStylesData.textWeight.normal}
              size={modelStylesData.textSize.normal}
              position="text-start"
            />

            <div class="flex flex-row gap-1">
              <p class="flex items-center text-center">
                Por favor lee nuestra
              </p>
              <Text
                text="Política de Privacidad"
                url={"https://www.fluxqr.com/politica-de-privacidad"}
                weight={modelStylesData.textWeight.subTitle}
                size={modelStylesData.textSize.normal}
              />
              <p class="flex items-center text-center">
                y
              </p>
              <Text
                text="Términos y Condiciones"
                url={"https://www.fluxqr.com/tyc"}
                weight={modelStylesData.textWeight.subTitle}
                size={modelStylesData.textSize.normal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
