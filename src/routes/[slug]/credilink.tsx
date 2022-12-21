import { component$, Resource, useResource$ } from "@builder.io/qwik";
import CustomTitle from "~/components/atoms/customTitle";
import Logo from "~/components/atoms/logo";
import CustomFooter from "~/components/molecules/customFooter";
import CustomForm from "~/components/molecules/customForm";
import { Credilink } from "~/models/credilink-model";
// import axios from "axios";

interface IProps {
  slug: string;
}

export default component$((props: IProps) => {
  
  const resource = useResource$<any>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(`http://127.0.0.1:3000/credilink/${props.slug}`, {
      signal: abortController.signal,
    });
    return res.json();
  });

  return (
    <div class="flex h-screen w-screen place-content-center m-0 p-0">
      <Resource
        value={resource}
        onPending={() => (
          <div class="bg-yellow-700">
            <h1 style={{ color: "blue !important" }}>Cargando...</h1>
          </div>
        )}
        onRejected={() => <div>Ocurrio un error</div>}
        onResolved={(found: Credilink) => (
          <div class="flex flex-col sm:flex-row w-screen">
            <div
              class="sm:w-2/3"
              style={{ background: found.colorSecondary }}
            ></div>
            <div class="flex flex-col place-content-center sm:w-[40%]">
              <div
                class="flex flex-col place-content-center h-screen w-screen sm:w-auto"
                style={{ backgroundImage: `url(${found.bg})` }}
              >
                {found.logo?.length ? (
                  <Logo url={found.logo} />
                ) : (
                  <CustomTitle
                    title={found.commerceName}
                    color={found.colorPrimary}
                  />
                )}
                <div class="flex place-content-center">
                  <CustomForm credilink={found} />
                </div>
              </div>
              <CustomFooter bgColor={found.colorPrimary} />
            </div>
          </div>
        )}
      />
    </div>
  );
});

// export const getData = async (name: string) => {
//   try {
//     const {data, status} = await axios.get(
//       `http://127.0.0.1:3000/regalink/${name}`
//     );
//     if (status === 200) {
//       return data;
//     }
//     console.log("es un error pero no entro al catch");
//     return;
//   } catch (error: any) {
//     console.log("entro al catch");
//     return;
//   }
// };
