import { Resource, component$, useStore } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
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
import type { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import { modelStylesData } from "~/models/modelStyles";

export const onGet: RequestHandler<Credilink | null> = async ({ params }) => {
  const res = await fetch(`${envVars.apiUrlFlux}credilink/${params.slug}`);
  if (res.status > 299 || res.status < 200) {
    return null;
  } else {
    const data = await res.json();
    console.log(data)
    return data;
  }
};

export default component$(() => {
  const resource = useEndpoint<Credilink>();
  const checkoutStore: CheckoutModel = useStore(initialCheckout);

  return (
    <div class="flex place-content-center m-0 p-0 h-full bg-white">
      <Resource
        value={resource}
        onPending={() => <ModalLoading />}
        onRejected={() => (
          <>
            <Sorry />
          </>
        )}
        onResolved={(found: Credilink) => (
          <>
            {checkoutStore.isLoading && <ModalLoading />}

            {!found?.commerce?.length && <Sorry />}

            {!checkoutStore.isCheckout &&
              !checkoutStore.isLogin &&
              found?.commerce?.length > 0 && (
                <>
                  {/* FORM SECTION */}
                  <div class="flex flex-col w-screen h-full bg-white sc600:w-[600px]">
                    {found.logo ? (
                      <Header imgSrc={found.logo} />
                    ) : (
                      <HeaderNoImage name={found.commerce} />
                    )}
                    <div
                      id={`form-footer-container`}
                      class={`flex flex-col w-screen h-full ${modelStylesData.bgColor.gradient} sc600:w-[600px]`}
                    >
                      <CustomForm credilink={found} checkout={checkoutStore} />
                      <Footer isSlug={true} />
                    </div>
                  </div>
                </>
              )}
            {/* LOGIN SECTION */}
            {checkoutStore.isLogin && (
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
                  <Loginkueski2 checkout={checkoutStore}/>
                )}
              </div>
            )}
            {/* CHECKOUT SECTION */}
            {checkoutStore.isCheckout && (
              <div class="flex justify-center items-start bg-white h-full w-screen">
                {checkoutStore.issuer.name === "aplazo" && (
                  <Checkoutaplazo credilink={found} checkout={checkoutStore}/>
                )}
                {checkoutStore.issuer.name === "mp" && (
                  <Checkoutmp credilink={found} checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "coppel" && (
                  <Checkoutcoppel credilink={found} checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "kueski" && (
                  <Checkoutkueski credilink={found} checkout={checkoutStore} />
                )}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
});

export const head: DocumentHead<Credilink> = ({ data }) => {
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
