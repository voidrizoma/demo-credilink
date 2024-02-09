import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-col gap-1 place-content-center">
      <Slot />
    </div>
  );
});
