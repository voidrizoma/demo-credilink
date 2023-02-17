import { component$, useClientEffect$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import Loan from "../components/molecules/loan";
// import Sorry from "~/components/molecules/sorry";

export default component$(() => {
  const loc = useLocation();

  useClientEffect$(() => {
    console.log(window.location.href);
    if (!window.location.href.includes("?loan=")) {
      console.log("inside the includes() ", window.location.href);
      console.log(loc)
      // window.location.href = "https://www.fluxqr.com/";
    }
    // if (!loc.query.loan || !loc.query.loan?.length) {
    //   if (typeof window !== "undefined") {
    //     window.location.href = "https://www.google.com/";
    //   }
    // }
  });

  return (
    <div class="flex w-screen h-screen place-content-center">
      {loc.query?.loan ? (
        <div>
          <Loan loan={loc.query.loan} />
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
