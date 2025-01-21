import { $, component$, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { Text } from "../atoms/text";
import { modelStylesData } from "~/models/modelStyles";
import ModalHelpBtn from "../molecules/help/modalHelpBtn";

interface IProps {
  isSlug: boolean;
  textBoxState: any;
  issuerNames: string[];
}

export default component$((props: IProps) => {

  const getDims = $(() => {
    if (window) {
      props.textBoxState.isDesktop = ["Win32"].includes(window.navigator.platform);
    }
    const issuersEl = document.getElementById("flux-issuers");
    if (issuersEl && issuersEl.style.pointerEvents === 'none') {
      issuersEl.style.pointerEvents = 'auto';
    }
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const divWidth = document
      .getElementById("flux-footer")
      ?.getBoundingClientRect().width;
    const divHeight = document
      .getElementById("flux-footer")
      ?.getBoundingClientRect().height;
    // if (wWidth > 0 && wHeight > 0 && divWidth !== undefined && divWidth > 0 && divHeight !== undefined && divHeight > 0) {
    //   const pad = `${((wWidth - divWidth) / 2 + 10).toFixed(0)}px`;
    //   props.textBoxState.padding = pad;
    //   props.textBoxState.wWidth = wWidth;
    //   props.textBoxState.wHeight = wHeight;
    //   props.textBoxState.footerHeight = divHeight;
    //   props.textBoxState.footerWidth = divWidth;
    // }
    if (
      props.textBoxState.wWidth !== wWidth ||
      props.textBoxState.wHeight !== wHeight ||
      props.textBoxState.footerWidth !== divWidth ||
      props.textBoxState.footerHeight !== divHeight
    ) {
      if (divWidth) {
        const pad = `${((wWidth - divWidth) / 2 + 10).toFixed(0)}px`;
        props.textBoxState.padding = pad;
        props.textBoxState.wWidth = wWidth;
        props.textBoxState.wHeight = wHeight;
        props.textBoxState.footerHeight = divHeight;
        props.textBoxState.footerWidth = divWidth;
      }
    }
  })

  useVisibleTask$(() => {
    getDims()
  }, { strategy: "document-ready" });

  return (
    <div
      id="flux-footer"
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

        {/* {props.isSlug && (
          <div
            id="flux-footer-text-scroll"
            class={`mx-2 my-0 h-[100%] w-[100%] py-0 ${modelStylesData.textSize.tiny} font-[500] text-white`}
            >
              Flux QR.
            </a>
          </div>
        )} */}

        {props.isSlug && (
          <div
            id="flux-footer-text-scroll"
            class={`mx-2 my-0 h-[100%] w-[100%] py-0 ${modelStylesData.textSize.tiny} font-[500] text-white`}
          >
            <Text
              text="Servicio proporcionado por Flux QR."
              margin="mt-2"
              color="text-white"
              weight={modelStylesData.textWeight.normal}
              size={modelStylesData.textSize.tiny}
              position="text-start"
            />

            <div class="flex flex-row gap-1">
              <p class="flex items-center text-center">
                Por favor lee nuestra
              </p>
              <Text
                text="Política de Privacidad"
                url={"https://www.fluxqr.com/politica-de-privacidad"}
                weight={modelStylesData.textWeight.normal}
                size={modelStylesData.textSize.tiny}
              />
              <p class="flex items-center text-center">
                y
              </p>
              <Text
                text="Términos y Condiciones"
                url={"https://www.fluxqr.com/tyc"}
                weight={modelStylesData.textWeight.normal}
                size={modelStylesData.textSize.tiny}
              />
              <ModalHelpBtn
                textBoxState={props.textBoxState}
                sizePercentage={0.8}
                issuerNames={props.issuerNames}
                getDims={getDims}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
