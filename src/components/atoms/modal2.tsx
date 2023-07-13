import { component$ } from "@builder.io/qwik";
import { StoreData } from "~/models/store-data-model";
import loader from "../../images/loader.gif";

export interface IProps {
  store: StoreData;
}

export default component$((props: IProps) => {
  return (
    <div class="flex place-content-center bg-zinc-200 bg-opacity-90 fixed inset-0 z-50">
      <div class="flex items-center h-screen">
        <div
          class={`flex m-3 p-4 justify-center items-center ${
            props.store?.isLoading ? "border-none" : "border-blue-500"
          } rounded-xl border-solid border-2 bg-white min-w-[200px] max-w-[300px] max-h-[300px]`}
        >
          {props.store?.isLoading && (
            <div class="flex justify-center items-center">
              <img class="flex m-2" src={loader} alt="" />
            </div>
          )}
          {props.store.error?.length > 0 && (
            <div class="flex flex-col justify-center items-center">
              <div class="flex text-lg text-black mb-10 justify-center items-center">
                {props.store.error}
              </div>
              <button
                class="flex text-lg justify-center items-center rounded-md bg-blue-500 text-white p-2"
                onClick$={() => {
                  props.store.email = "";
                  props.store.amount = "";
                  props.store.error = "";
                  props.store.isLoading = false;
                }}
              >
                CERRAR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
