import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { Loan } from "../../models/loan-model";
import Logo from "../atoms/logo";
import Qr from "../atoms/qr";
import CustomFooter from "./customFooter";

export interface IProps {
  loan: string;
}

export default component$((props: IProps) => {
  const api = "https://flux-api-six.vercel.app/"

  const resource = useResource$<any>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(`${api}loans/${props.loan}`, {
      signal: abortController.signal,
    });
    return res.json();
  });

  return (
    <div class="flex flex-col place-content-center text-black ">
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => (
          <div class="flex place-content-center h-screen p-8">
            <div class="flex flex-col p-8 gap-8 place-content-center border-2 rounded-md h-[300px] w-[300px]">
              <p class="text-4xl text-center">¡Lo sentimos!</p>
              <a href="https://www.w3schools.com">
                <p class="text-xl text-center text-blue-600 underline underline-offset-2">
                  Visita FluxQR
                </p>
              </a>
            </div>
          </div>
        )}
        onResolved={(found: Loan) => {
          return (
            <div>
              <div class="flex flex-col py-[2%] px-[10%] place-content-center h-screen gap-2">
                  <Logo url={found.logoIssuer} />
                <p class="flex place-content-center text-center font-bold">
                  {found.title}
                </p>
                <p class="flex place-content-center text-center">
                  {found.text1}
                </p>
                <p class="flex place-content-center">{found.text2}</p>
                <Qr
                  url={`https://qr.fluxqr.net/?text=${encodeURIComponent(
                    found.qr
                  )}`}
                />
                <p class="flex place-content-center text-center">
                  {"Monto aprobado: $" + found.amount}
                </p>
                <p class="flex place-content-center">
                  {"Vigencia: " + found.expiration}
                </p>
              </div>
              <CustomFooter bgColor={found.bg} logoCommerce={found.logoCommerce}/>
            </div>
          );
        }}
      />
    </div>
  );
});
