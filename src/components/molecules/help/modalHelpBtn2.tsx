import { $, component$, useStore } from "@builder.io/qwik";
import { Text } from '../../atoms/text'
import helpIcon from "../../../assets/help/helpIcon.png";
import aplazo from "../../../assets/help/btn_ayuda_AP.png";
import mp from "../../../assets/help/btn_ayuda_MP.png";
import coppel from "../../../assets/help/btn_ayuda_CP.png";
import close from "../../../assets/help/close.png";
import { modelStylesData } from "~/models/modelStyles";

interface IProps {
  textBoxState: any;
  padding: string;
  wWidth: number;
  wHeight: number;
  footerHeight: number;
  footerWidth: number;
  sizePercentage: number;
  isDesktop: boolean
}

export default component$((props: IProps) => {

  const itemStore = useStore(
    [
      {
        url: "https://youtube.com/embed/RKOIdBL4Y1A?feature=shared",
        show: false,
        img: aplazo,
        name: "aplazo"
      },
      {
        url: "https://youtube.com/embed/u6ObUs7u9qg?feature=shared",
        show: false,
        img: mp,
        name: "mp"
      },
      {
        url: "https://youtube.com/embed/tEL3MemnAxI?feature=shared",
        show: false,
        img: coppel,
        name: "coppel"
      }
    ]
  );

  const onClickIssuerBtn = $((i: number) => {
    if (i == 4 || i == 5) {
      for (const item of itemStore) {
        item.show = false;
      }
      if (i == 4) props.textBoxState.isOpen = !props.textBoxState.isOpen;
    } else {
      for (let listIndex = 0; listIndex < itemStore.length; listIndex++) {
        if (listIndex != i) {
          itemStore[listIndex].show = false;
        }
        itemStore[i].show = !itemStore[i].show;
      }
    }
  })

  return (
    <>
      {props.textBoxState !== null && (
        <div
          id="dialogDiv"
          class={props.isDesktop ? `fixed z-40 flex items-end justify-end place-self-end pe-[20px]` : `absolute z-40 flex items-end justify-end place-self-end pe-[20px]`}
          style={{
            top: 0,
            left: 0,
            bottom: props.footerHeight / 2 + 20,
            right: (props.wWidth - props.footerWidth) / 2
          }}
        >
          <div class="flex flex-col items-end gap-1"
            style={{ width: props.footerWidth * props.sizePercentage * 0.9 }}
          >
            {props.textBoxState.isOpen && (
              <div
                id='flux-help-container'
                class={`flex flex-wrap justify-center rounded-[20px] bg-white p-4 shadow-md`}
                style={{
                  width: props.footerWidth * props.sizePercentage * 0.9,
                  height: props.wHeight * props.sizePercentage * 0.9,
                }}
              >
                <div class='flex flex-col gap-2 items-center w-full' style={{
                  height: props.wHeight * props.sizePercentage * 0.85,
                }}>
                  <div class='flex self-end'>
                    <button
                      type="button"
                      onClick$={() => {
                        itemStore.some(el => el.show == true) ? onClickIssuerBtn(5) : onClickIssuerBtn(4);
                      }}
                    >
                      <img
                        height={17}
                        width={17}
                        src={close}
                        alt="CloseHelp"
                        loading="lazy"
                      />
                    </button>
                  </div>
                  
                  {!itemStore.some(el => el.show == true) && <>

                    <Text
                      text={'¿Tienes dudas?'}
                      size={modelStylesData.textSize.title}
                      weight={modelStylesData.textWeight.title}
                      position={`place-content-center text-center`}
                      color="text-black"
                    />
                    <div class='h-2'></div>
                    <Text
                      text={`Mira un video de cómo funciona cada opción de crédito:`}
                      size={modelStylesData.textSize.subtitle}
                      weight={modelStylesData.textWeight.normal}
                      position={`text-center`}
                      color="text-black"
                    />
                    <div class={`${props.wHeight > 800 ? 'h-[20px]' : 'h-[10px]'}`}></div>
                    <div class='flex flex-col items-center '>
                      {itemStore.map((el, i) => (
                        <>
                          <button
                            class='hover:scale-[1.1]'
                            onClick$={() => onClickIssuerBtn(i)}
                          >
                            <img
                              class={`self-center rounded hover:scale-[1.05] pt-4`}
                              height={props.footerWidth * props.sizePercentage * (props.wHeight > 800 ? 0.1 : 0.08)}
                              width={props.footerWidth * props.sizePercentage * (props.wHeight > 800 ? 0.7 : 0.6)}
                              src={itemStore[i].img}
                              alt={itemStore[i].name}
                              loading="lazy"
                            />
                          </button>
                          <div class={`${props.wHeight > 800 ? 'h-[40px]' : 'h-[25px]'}`}></div>
                        </>
                      ))}
                    </div>
                  </>}
                  <div class='flex flex-col items-center'>
                    {itemStore.map((el, i) => (
                      <>
                        {itemStore[i].show && <div class='flex flex-col justify-center items-center'>
                          <iframe
                            class='pt-4'
                            width={props.footerWidth * props.sizePercentage * 0.75}
                            height={props.wHeight * props.sizePercentage * 0.75}
                            src={itemStore[i].url}
                            title={`${itemStore[i].name} YT Fluxqr help vid`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                        </div >}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div class="flex w-[50px] items-end justify-end rounded-[50%] text-white pt-2"
            >
              <button
                id="dialogBtn"
                type="button"
                class="rounded-[50%]"
                onClick$={() => {
                  onClickIssuerBtn(4);
                }}
              >
                <img
                  id="dialogImg"
                  class={`self-center rounded-[50%] ${props.textBoxState.isOpen && "scale-[1.05]"
                    } hover:scale-[1.05]`}
                  height={props.wHeight > 800 ? 60 : 40}
                  width={props.wHeight > 800 ? 60 : 40}
                  src={helpIcon}
                  alt="HelpIcon"
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </div >
      )}
    </>
  );
});
