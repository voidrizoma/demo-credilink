import { component$, useStore } from "@builder.io/qwik";
import {
  DocumentHead,
  routeLoader$,
} from "@builder.io/qwik-city";
import Checkoutaplazo from "~/components/molecules/checkouts/checkoutaplazo";
import Checkoutcoppel from "~/components/molecules/checkouts/checkoutcoppel";
import Checkoutkueski from "~/components/molecules/checkouts/checkoutkueski";
import Checkoutmp from "~/components/molecules/checkouts/checkoutmp";
import CustomForm from "~/components/molecules/customForm";
import Loginaplazo from "~/components/molecules/logins/loginaplazo";
import Logincoppel from "~/components/molecules/logins/logincoppel";
import Loginkueski2 from "~/components/molecules/logins/loginkueski";
import Loginmp from "~/components/molecules/logins/loginmp";
import { ModalLoading } from "~/components/molecules/modalLoading";
import Sorry from "~/components/molecules/sorry";
import Footer from "~/components/template/footer";
import Header from "~/components/template/header";
import HeaderNoImage from "~/components/template/headerNoImage";
import { CheckoutModel, initialCheckout } from "~/models/checkout-model";
import { initialCredilink, type Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import { modelStylesData } from "~/models/modelStyles";
import logoflux from "../../assets/flux_blanco.png"

export const useGetSlugData = routeLoader$(async ({ params }) => {
  let credilink = initialCredilink;
  const res = await fetch(`${envVars.apiUrlFlux}credilink/${params.slug}`);
  if (res.status > 299 || res.status < 200) {
    return null;
  } else {
    const data = await res.json();
    console.log(data); // Log the response data to check its structure
    credilink = {
      ...credilink,
      ...data
    }
    credilink.logo = logoflux
    return credilink;
  }
});

export default component$(() => {
  const { value } = useGetSlugData();
  const checkoutStore: CheckoutModel = useStore(initialCheckout);

  const textBoxState = useStore({
    isOpen: false,
    hasLoan: false,
    padding: "",
    wWidth: 0,
    wHeight: 0,
    footerHeight: 0,
    footerWidth: 0,
    isDesktop: false
  });

  return (
    <div class="flex place-content-center m-0 p-0 h-full bg-white"
      onClick$={(e) => {
        const target = e.target as HTMLElement;
        console.log("target.id ", target.id)
        console.log(target.id.includes("help-"))
        if (!target.id.includes("help-") && textBoxState.isOpen) {
          textBoxState.isOpen = false;
        }
      }}
    >
      {value === null || !value?.commerce?.length && <Sorry />}
      {checkoutStore.isLoading && <ModalLoading />}
      {!value?.commerce?.length && <Sorry />}

      {!checkoutStore.isCheckout &&
        !checkoutStore.isLogin && value &&
        value?.commerce?.length > 0 && (
          <>
            {/* FORM SECTION */}
            <div class="flex flex-col w-screen h-full bg-white sc600:w-[600px]">
              {value.logo ? (
                <Header imgSrc={value.logo} />
              ) : (
                <HeaderNoImage name={value.commerce} />
              )}
              <div
                id={`form-footer-container`}
                class={`flex flex-col w-screen h-full ${modelStylesData.bgColor.gradient} sc600:w-[600px]`}
              >
                <CustomForm credilink={value} checkout={checkoutStore} />
                <Footer isSlug={true} textBoxState={textBoxState} issuerNames={value.issuers.length > 0 ? value.issuers.map((i: any) => i?.name) : [""]} />
              </div>
            </div>
          </>
        )}
      {/* LOGIN SECTION */}
      {checkoutStore.isLogin && value !== null && (
        <div class="flex justify-center items-start bg-white h-full w-screen">
          {checkoutStore.issuer.name === "aplazo" && (
            <Loginaplazo checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "mp" && (
            <Loginmp checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "coppel" && (
            <Logincoppel checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "kueski" && (
            <Loginkueski2 checkout={checkoutStore} />
          )}
        </div>
      )}
      {/* CHECKOUT SECTION */}
      {checkoutStore.isCheckout && value !== null && (
        <div class="flex justify-center items-start bg-white h-full w-screen">
          {checkoutStore.issuer.name === "aplazo" && (
            <Checkoutaplazo credilink={value} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "mp" && (
            <Checkoutmp credilink={value} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "coppel" && (
            <Checkoutcoppel credilink={value} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "kueski" && (
            <Checkoutkueski credilink={value} checkout={checkoutStore} />
          )}
        </div>
      )}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data: Credilink | null | undefined =
    resolveValue(useGetSlugData);
  const title = `${data?.commerceName || "not found"} - Credilink`;
  const description = data?.description || "not found";

  return {
    title: title,
    meta: [
      { name: "robots", content: " noindex" },
      { name: "description", content: description },
      { name: "og:title", content: title },
      { name: "og:description", content: description },
      { name: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:creator", content: "@fluxqr" },
    ],
  };
};
