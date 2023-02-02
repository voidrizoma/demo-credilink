import { component$ } from "@builder.io/qwik";
import loader from "../../images/loader.gif";

export default component$(() => {
  return (
    <div class="flex place-content-center bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div class="flex items-center h-screen">
        <div
          class={`flex m-3 p-4 justify-center items-center border-none rounded-xl border-2 bg-white min-w-[200px] max-w-[300px] max-h-[300px]`}
        >
          <div class="flex justify-center items-center">
            <img class="flex m-2" src={loader} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
});
