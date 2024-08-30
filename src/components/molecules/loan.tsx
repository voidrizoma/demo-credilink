import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { Loan } from "../../models/loan-model";
import Qr from "../atoms/qr";
import Sorry from "./sorry";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "./modalLoading";
import Header from "../template/header";
import Footer from "../template/footer";
import { Text } from "../atoms/text";
import { modelStylesData } from "~/models/modelStyles";
import Logo from "../atoms/logo";

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
    if (res.status == 200) {
      const resp = await res.json();
      // console.log(resp);
      return resp;
    }
    return null;
  });

  return (
    <div class="flex h-screen w-screen flex-col place-content-center bg-white text-white sc600:w-[600px]">
      <Resource
        value={resource}
        onPending={() => <ModalLoading />}
        onRejected={() => <Sorry />}
        onResolved={(found: Loan) => {
          return (
            <>
              {found == null && <Sorry />}
              {found !== null && (
                <div class="flex h-[calc(100vh-200px)] flex-col text-center text-black">
                  <Header imgSrc={found.logoCommerce} />
                  <Text
                    text={found.title}
                    size={modelStylesData.textSize.title}
                    weight={modelStylesData.textWeight.subTitle}
                    padding="pb-3 sc500:pt-4"
                  />
                  {/* here would go the logo of the issuer but API does not support it yet */}
                  {/* <Logo url={found.logoCommerceBlack || ""} /> */}
                  <Text
                    text="Presenta el siguiente código QR en caja para pagar tus productos."
                    size={modelStylesData.textSize.subtitle}
                    weight={modelStylesData.textWeight.normal}
                    position="self-center"
                    padding="px-2 py-3"
                  />
                  <Text
                    text="¡Disfruta tu compra!"
                    size={modelStylesData.textSize.title}
                    weight={modelStylesData.textWeight.subTitle}
                  />
                  <Qr
                    url={`https://qr.fluxqr.net/?text=${encodeURIComponent(
                      found.qr
                    )}`}
                  />

                  <Text
                    text={
                      "Monto aprobado:"}
                    size={modelStylesData.textSize.subtitle}
                    weight={modelStylesData.textWeight.normal}
                  />
                  <p class='text-[12px] sc200:text-[22px] sc300:text-[30px] sc400:text-[36px] sc500:text-[46px] py-3'>{(parseFloat(found.amount as any) / 100).toFixed(2)}</p>
                  <Text
                    text={`Expira el ${found.expiration}`}
                    size={modelStylesData.textSize.subtitle}
                    weight={modelStylesData.textWeight.normal}
                  />
                  <Footer isSlug={false} />
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
});
