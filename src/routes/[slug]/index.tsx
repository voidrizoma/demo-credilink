import { Resource, component$, useStore } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import Checkoutaplazo from "~/components/molecules/checkouts/checkoutaplazo";
import Checkoutcoppel from "~/components/molecules/checkouts/checkoutcoppel";
import Checkoutmp from "~/components/molecules/checkouts/checkoutmp";
// import CustomFooter from "~/components/molecules/customFooter";
import CustomForm from "~/components/molecules/customForm";
import Login from "~/components/molecules/login";
import Logincoppel from "~/components/molecules/logins/logincoppel";
import Loginmp from "~/components/molecules/logins/loginmp";
import { ModalLoading } from "~/components/molecules/modalLoading";
import Sorry from "~/components/molecules/sorry";
import { CheckoutModel, initialCheckout } from "~/models/checkout-model";
import type { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";

export const onGet: RequestHandler<Credilink | null> = async ({ params }) => {
  const res = await fetch(`${envVars.apiUrl}credilink/${params.slug}`);
  if (res.status > 299 || res.status < 200) {
    return null;
  } else {
    return res.json();
  }
};

export default component$(() => {
  const resource = useEndpoint<Credilink>();
  const checkoutStore: CheckoutModel = useStore(initialCheckout);

  return (
    <div class="flex place-content-center m-0 p-0">
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

            {checkoutStore.isCheckout && (
              <>
                {checkoutStore.issuer.name === "aplazo" && (
                  <Checkoutaplazo credilink={found} checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "mp" && (
                  <Checkoutmp credilink={found} checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "coppel" && (
                  <Checkoutcoppel credilink={found} checkout={checkoutStore} />
                )}
              </>
            )}

            {!checkoutStore.isCheckout &&
              !checkoutStore.isLogin &&
              found?.commerce?.length > 0 && (
                <div class="flex flex-col">
                  <div class="flex flex-col place-content-center">
                    <div
                      class="flex flex-col place-content-center"
                      // style={{ backgroundImage: `url(${found.bg})` }}
                    >
                      <div class="flex place-content-center">
                        <CustomForm
                          credilink={found}
                          checkout={checkoutStore}
                        />
                      </div>
                    </div>
                    {/* <CustomFooter bgColor={found.colorPrimary} /> */}
                  </div>
                </div>
              )}

            {checkoutStore.isLogin && (
              <>
                {checkoutStore.issuer.name === "aplazo" && (
                  <Login checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "mp" && (
                  <Loginmp checkout={checkoutStore} />
                )}
                {checkoutStore.issuer.name === "coppel" && (
                  <Logincoppel checkout={checkoutStore} />
                )}
              </>
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
