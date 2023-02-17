import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Loan from "../components/molecules/loan";
// import Sorry from "~/components/molecules/sorry";

export default component$(() => {
  // const loc = useLocation();
  const state = useStore({
    loan: "",
  });

  useClientEffect$(() => {
    console.log(window.location.href);
    if (window.location.href.includes("?loan=")) {
      state.loan = window.location.href.split("=")[1];
    }
    // if (!loc.query.loan || !loc.query.loan?.length) {
    //   if (typeof window !== "undefined") {
    //     window.location.href = "https://www.google.com/";
    //   }
    // }
  });

  return (
    <div class="flex w-screen h-screen place-content-center">
      {state?.loan?.length > 0 ? (
        <div>
          <Loan loan={state.loan} />
        </div>
      ) : (
        // <Sorry />
        <div>Sorry</div>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "FluxQR",
};
