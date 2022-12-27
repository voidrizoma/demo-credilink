import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Loan from "../components/molecules/loan";

export default component$(() => {
  const loc = useLocation();

  return (
    <div>
      {loc.query?.loan ? (
        // {loc.query?.loan ? (
        <div>
          <Loan loan={loc.query.loan} />
        </div>
      ) : (
          <div class="flex place-content-center h-screen p-8">
            <div class="flex flex-col p-8 gap-8 place-content-center border-2 rounded-md h-[300px] w-[300px]">
              <p class="text-4xl text-center">¡Lo sentimos!</p>
              <a href="https://www.fluxqr.com/">
                <p class="text-xl text-center text-blue-600 underline underline-offset-2">
                  Visita FluxQR
                </p>
              </a>
            </div>
          </div>
      )}
    </div>
  );
});

// export const head: DocumentHead = {
//   title: 'Qwik Practice',
//   meta: [
//     {
//       name: 'description',
//       content: 'Qwik site description',
//     },
//   ],
// };
