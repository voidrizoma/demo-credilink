import { $, component$, useStore } from "@builder.io/qwik";
import helpIcon from "../../../assets/help/helpIcon.png";
import close from "../../../assets/help/close.png";
import { modelStylesData } from "~/models/modelStyles";
import { issuersHelpList } from "~/models/modelIssuers";
import { Text } from "../../atoms/text"

interface IProps {
  textBoxState: any;
  getDims: any;
  sizePercentage: number;
  issuerNames: string[];
}

export default component$((props: IProps) => {

  const matchedIssuers = issuersHelpList.filter(item => props.issuerNames.includes(item.name));

  const itemStore = useStore(
    [...matchedIssuers, issuersHelpList[issuersHelpList.length - 1]]
  );

  const btnSizeFactor = 0.6;

  const onClickIssuerBtn = $((i: number) => {


    if (i == 4 || i == 5) {
      for (const item of itemStore) {
        item.show = false;
      }
      if (i == 4) {
        props.textBoxState.isOpen = !props.textBoxState.isOpen
      }
    } else {
      for (let listIndex = 0; listIndex < itemStore.length; listIndex++) {
        if (listIndex != i) {
          itemStore[listIndex].show = false;
        } else {
          itemStore[i].show = true;
        }
      }
    }
  })

  return (
    <>
      {props.textBoxState !== null && (
        <div
          id="help-dialogDiv"
          class={`fixed z-40 flex items-end justify-end place-self-end pe-[20px]`}
          style={{
            top: props.textBoxState.wHeight * props.sizePercentage * 1,
            left: 0,
            bottom: props.textBoxState.footerHeight / 2 + 15,
            right: (props.textBoxState.wWidth - props.textBoxState.footerWidth) / 2
          }}
        >
          <div
            id="help-cont1"
            class="flex flex-col items-end gap-1"
            style={{ width: props.textBoxState.footerWidth * props.sizePercentage * 0.9 }}
          >
            {props.textBoxState.isOpen && (
              <div
                id='flux-help-container'
                class={`flex flex-wrap justify-center rounded-[20px] bg-white p-4 shadow-md`}
                style={{
                  width: props.textBoxState.footerWidth * props.sizePercentage * 0.9,
                  height: props.textBoxState.wHeight * props.sizePercentage * 1,
                }}
              >
                <div
                  id='help-cont2'
                  class='flex flex-col gap-1 items-center w-full' style={{
                    height: props.textBoxState.wHeight * props.sizePercentage * 0.95,
                  }}>
                  <div
                    id={`help-closeBtn`}
                    class='flex self-end'>
                    <button
                      id="help-close-btn-el"
                      type="button"
                      onClick$={() => {
                        itemStore.some(el => el.show == true) ? onClickIssuerBtn(5) : onClickIssuerBtn(4);
                      }}
                    >
                      <img
                        id="help-close-btn-img"
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
                      id={"help-txt-1"}
                      text={'¿Tienes dudas?'}
                      size={modelStylesData.textSize.title}
                      weight={modelStylesData.textWeight.title}
                      position={`place-content-center text-center`}
                      color="text-black"
                    />
                    <div id="help-sep1" class='h-1'></div>
                    <Text
                      id={"help-txt-2"}
                      text={'Mira un video de cómo funciona cada opción de crédito:'}
                      size={modelStylesData.textSize.subtitle}
                      weight={modelStylesData.textWeight.subTitle}
                      position={`text-center`}
                      color="text-black"
                    />
                    <div id="help-sep-2" class={`${props.textBoxState.wHeight > 800 ? 'h-[6px]' : 'h-[2px]'}`}></div>
                    <div id="help-list-items-cont" class='flex flex-col items-center overflow-y-auto'>
                      {itemStore.map((el, i) => (
                        <>
                          {el.name !== 'whatsapp' && <button
                            id={`help-${el} ${i}`}
                            class='hover:scale-[1.1]'
                            onClick$={() => onClickIssuerBtn(i)}
                          >
                            <img
                              id={`help-${el} ${i}-img`}
                              class={`self-center rounded hover:scale-[1.05] pt-3`}
                              width={props.textBoxState.footerWidth * props.sizePercentage * (props.textBoxState.wHeight > 640 ? btnSizeFactor : btnSizeFactor * 0.7)}
                              src={itemStore[i].img}
                              alt={itemStore[i].name}
                              loading="lazy"
                            />
                          </button>}
                          {el.name === 'whatsapp' &&
                            <div
                              id={`help-${el} ${i} - wp-cont`}
                              class='flex flex-col justify-center gap-2 mt-2 items-center'
                              style={{ width: props.textBoxState.footerWidth * props.sizePercentage * (props.textBoxState.wHeight > 800 ? btnSizeFactor - 0.1 : btnSizeFactor + 0.2) }}
                            >
                              <Text
                                id={`help-${el} ${i} text1`}
                                text={'¿Necesitas ayuda?'}
                                size={modelStylesData.textSize.title}
                                weight={modelStylesData.textWeight.title}
                                position={`place-content-center text-center`}
                                color="text-black"
                              />
                              <a id={`help-${el} ${i} ref`} href="https://wa.me/525540819626?text=hola%2C%20tengo%20un%20problema%20con%20mi%20cr%C3%A9dito" target="_blank" class='hover:scale-[1.05]'>
                                <img
                                  id="help-wp"
                                  class={`self-center`}
                                  width={props.textBoxState.footerWidth * props.sizePercentage * (props.textBoxState.wHeight > 640 ? btnSizeFactor : btnSizeFactor * 0.7)}
                                  src={itemStore[itemStore.length - 1].img}
                                  alt="wpIcon"
                                  loading="lazy"
                                />
                              </a>
                            </div>}
                          <div id='help-h25-' class={`${props.textBoxState.wHeight > 800 ? 'h-[25px]' : 'h-[15px]'}`}></div>
                        </>
                      ))}
                    </div>
                  </>}
                  <div id='help-iframe-container' class='flex flex-col items-center'>
                    {itemStore.map((el, i) => (
                      <>
                        {itemStore[i].show && <div class='flex flex-col justify-center items-center'>
                          <iframe
                            id={`help-tyiframe${i}`}
                            class='pt-4'
                            width={props.textBoxState.footerWidth * props.sizePercentage * 0.75}
                            height={props.textBoxState.wHeight * props.sizePercentage * 0.75}
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
            <div id={`help-wp-opener-container`} class="flex w-[50px] items-end justify-end rounded-[50%] text-white pt-2"
            >
              <button
                id="help-dialogBtn"
                type="button"
                class="rounded-[50%]"
                onClick$={() => {
                  onClickIssuerBtn(4);
                }}
              >
                <img
                  id="help-dialogImg"
                  class={`self-center rounded-[50%] ${props.textBoxState.isOpen && "scale-[1.05]"
                    } hover:scale-[1.05]`}
                  height={props.textBoxState.wHeight > 800 ? 60 : 40}
                  width={props.textBoxState.wHeight > 800 ? 60 : 40}
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
