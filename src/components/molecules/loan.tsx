import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { Loan } from "../../models/loan-model";
import Logo from "../atoms/logo";
import Qr from "../atoms/qr";
import CustomFooter from "./customFooter";
import Sorry from "./sorry";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "./modalLoading";

export interface IProps {
  loan: string;
}

export default component$((props: IProps) => {
  const api = envVars.apiUrl;

  const resource = useResource$<any>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(`${api}loans/${props.loan}`, {
      signal: abortController.signal,
    });
    return res.json();
  });

  return (
    <div class="flex flex-col text-black ">
      <Resource
        value={resource}
        onPending={() => <ModalLoading />}
        onRejected={() => <Sorry />}
        onResolved={(found: Loan) => {
          return (
            <div>
              <div class="flex flex-col py-[2%] px-[10%] mt-[4%] h-screen gap-2">
                <Logo url={found.logoIssuer} />
                <p class="flex place-content-center text-center font-bold pt-[5%]">
                  {found.title}
                </p>
                <p class="flex place-content-center text-center">
                  {found.text1}
                </p>
                <p class="flex place-content-center">{`${found.text2}`}</p>
                {/* <p class="flex place-content-center">{`${found.text2} en ${found.commerce}`}</p> */}
                <Qr
                  url={`https://qr.fluxqr.net/?text=${encodeURIComponent(
                    found.qr
                  )}`}
                />
                {parseFloat(found?.amount as any) > 0 && (
                  <p class="flex place-content-center text-center">
                    {"Monto aprobado: $" +
                      (parseFloat(found.amount as any)/100).toFixed(2)}
                  </p>
                )}
                <p class="flex place-content-center">
                  {`Expira el ${found.expiration}`}
                </p>
              </div>
              <CustomFooter
                bgColor={found.bg}
                logoCommerce={found.logoCommerce}
              />
            </div>
          );
        }}
      />
    </div>
  );
});
