import { Slot, component$ } from "@builder.io/qwik";

export const Modal = component$(() => {
  return (
    <div class="flex place-content-center bg-zinc-200 bg-opacity-90 fixed inset-0 z-50">
      <div class="flex items-center h-screen">
        <div
          class={`flex m-3 p-4 justify-center items-center border-none rounded-xl border-2 bg-none min-w-[200px] max-w-[300px] max-h-[300px]`}
        >
          <div class="flex flex-col justify-center items-center">
            <Slot />
          </div>
        </div>
      </div>
    </div>
  );
});
