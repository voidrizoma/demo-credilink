import { component$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { issuerLogoFinder } from "~/helpers/issuer-methods";
import { Issuer } from "~/models/issuer-model";
import { StoreData } from "~/models/store-data-model";
import CustomText from "./customText";
// import { FacebookIcon, FacebookShareButton } from "react-share";

export interface IProps {
  issuers: Issuer[];
  store: StoreData;
}

export default component$((props: IProps) => {
  const location = useLocation();
  const urlStore = useStore({ url: "" });
  const selected = useStore({ index: -1 });

  if (location?.href?.length) {
    // Do the thing
    // console.log(`location is = ${location.href}`)
    urlStore.url = location.href;
  }

  return (
    <>
    <div class="flex place-content-center p-[10%]">
      <CustomText text="Selecciona una opción:" size="16px" weight="700"/>
    </div>
      <div class="flex justify-center flex-wrap self-center gap-10">
        {props.issuers.map((el, elIndex) => (
          <button
            class={`flex border-2 place-content-center border-none ${
              elIndex !== selected?.index
                ? "hover:opacity-50 hover:scale-[1.05]"
                : "opacity-50 scale-[1.05]"
            }`}
            disabled={elIndex === selected?.index ? true : false}
            onClick$={() => {
              selected.index = elIndex;
            }}
          >
            <div class="flex flex-col place-content-center p-2 w-[150px] h-[150px] bg-white rounded-[15px]">
              <img class="flex p-1" src={issuerLogoFinder(el)} alt="" />
              <p class="flex text-center text-[12px] text-black p-1">
                {el.proposal}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
});
