import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Loan from "~/components/molecules/loan";
import { ModalLoading } from "~/components/molecules/modalLoading";
import Sorry from "~/components/molecules/sorry";

export default component$(() => {
  const state = useStore({
    loan: "",
    isLoading: true,
  });

  // useClientEffect$(() => {
  //   if (window.location.href.includes("?loan=")) {
  //     state.loan = window.location.href.split("=")[1];
  //   }
  //   state.isLoading = false;
  // });

  return (
    <div class="flex w-full h-full place-content-center">
      {state?.loan?.length > 0 ? (
        <div>
          <Loan loan={state.loan} />
        </div>
      ): <ModalLoading/>}
      {!state?.loan?.length && !state.isLoading && <Sorry />}
    </div>
  );
});

export const head: DocumentHead = {
  title: "FluxQR",
};
