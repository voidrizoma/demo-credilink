import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import Loan from "../components/molecules/loan";
import Sorry from "~/components/molecules/sorry";

export default component$(() => {
  const loc = useLocation();

    if (!loc.query?.loan || !loc.query.loan?.length) {
        window.location.href = "https://www.fluxqr.com/";
    }

  return (
    <div class="flex w-screen h-screen place-content-center">
      {loc.query?.loan ? (
        <div>
          <Loan loan={loc.query.loan} />
        </div>
      ) : (
        <Sorry />
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "FluxQR",
};