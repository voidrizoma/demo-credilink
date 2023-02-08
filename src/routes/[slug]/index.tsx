import { Resource, component$ } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import Loader from "~/components/atoms/loader";
// import CustomFooter from "~/components/molecules/customFooter";
import CustomForm from "~/components/molecules/customForm";
import Sorry from "~/components/molecules/sorry";
import type { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";

export const onGet: RequestHandler<Credilink | null> = async ({ params }) => {
  const res = await fetch(
    `${envVars.apiUrl}credilink/${params.slug}`
  );
  if (res.status > 299 || res.status < 200) {
    return null;
  } else {
    return res.json();
  }
};

export default component$(() => {
  const resource = useEndpoint<Credilink>();

  return (
    <div class="flex place-content-center m-0 p-0">
      <Resource
        value={resource}
        onPending={() => <Loader />}
        onRejected={() => (
          <>
            <Sorry />
          </>
        )}
        onResolved={(found: Credilink) => (
          <>
            {!found || !found?.commerce?.length ? (
              <Sorry />
            ) : (
              <div class="flex flex-col">
                <div class="flex flex-col place-content-center">
                  <div
                    class="flex flex-col place-content-center"
                    style={{ backgroundImage: `url(${found.bg})` }}
                  >
                    <div class="flex place-content-center">
                      <CustomForm credilink={found} />
                    </div>
                  </div>
                  {/* <CustomFooter bgColor={found.colorPrimary} /> */}
                </div>
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
