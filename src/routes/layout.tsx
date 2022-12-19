import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main class="flex place-content-center">
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer class="d-none"></footer>
    </>
  );
});
