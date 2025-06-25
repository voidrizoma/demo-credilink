import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Checkoutaplazo from "~/components/molecules/checkouts/checkoutaplazo";
import Checkoutcoppel from "~/components/molecules/checkouts/checkoutcoppel";
import Checkoutkueski from "~/components/molecules/checkouts/checkoutkueski";
import CheckoutCreditea from "~/components/molecules/checkouts/checkoutCreditea";
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
import { type Credilink } from "~/models/credilink-model";
import { modelStylesData } from "~/models/modelStyles";
import logoflux from "../../assets/flux_blanco.png";
import { issuersList } from "~/models/issuer-model"; // Asegúrate que `issuersList` esté importado

export default component$(() => {
  // ✅ Datos estáticos de CCP
  const credilinkStore = useStore<{ value: Credilink }>({
    value: {
      slug: "ccp",
      template: "default",
      emailSender: "noreply@fluxqr.com",
      commerceName: "Comercio CCP",
      commerce: "Comercio CCP",
      issuer: "defaultIssuer",
      issuers: issuersList, // o el array que uses
      colorPrimary: "#FFC107",
      colorSecondary: "#FFA000",
      sender: "FluxQR <noreply@fluxqr.com>",
      subject: "Tu compra con Credilink",
      title: "Compra ahora y paga después",
      description: "Selecciona tu forma de pago favorita",
      logo: logoflux,
      tyc: "Términos y condiciones aplican",
      bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
      min: 500,
      max: 12000,
    },
  });  

  const checkoutStore = useStore<CheckoutModel>(initialCheckout);

  const textBoxState = useStore({
    isOpen: false,
    hasLoan: false,
    padding: "",
    wWidth: 0,
    wHeight: 0,
    footerHeight: 0,
    footerWidth: 0,
    isDesktop: false,
  });

  const cl = credilinkStore.value;

  return (
    <div
      class="flex place-content-center bg-white"
      onClick$={(e) => {
        const t = (e.target as HTMLElement).id;
        if (!t.includes("help-") && textBoxState.isOpen) {
          textBoxState.isOpen = false;
        }
      }}
    >
      {!cl?.commerce?.length && <Sorry />}
      {checkoutStore.isLoading && <ModalLoading />}

      {!checkoutStore.isCheckout && !checkoutStore.isLogin && cl && cl.commerce.length > 0 && (
        <div class="flex flex-col w-screen  sc600:w-[600px]">
          {cl.logo ? <Header imgSrc={cl.logo} /> : <HeaderNoImage name={cl.commerce} />}
          <div
            class={`flex flex-col w-screen ${modelStylesData.bgColor.gradient} sc600:w-[600px]`}
          >
            <CustomForm credilink={cl} checkout={checkoutStore} />
            <Footer
              isSlug
              textBoxState={textBoxState}
              issuerNames={cl.issuers.map((i) => i.name)}
            />
          </div>
        </div>
      )}

      {checkoutStore.isLogin && cl && (
        <div class="flex justify-center items-start bg-white  w-screen">
          {checkoutStore.issuer.name === "aplazo" && <Loginaplazo checkout={checkoutStore} />}
          {checkoutStore.issuer.name === "mp" && <Loginmp checkout={checkoutStore} />}
          {checkoutStore.issuer.name === "coppel" && <Logincoppel checkout={checkoutStore} />}
          {checkoutStore.issuer.name === "kueski" && <Loginkueski2 checkout={checkoutStore} />}
        </div>
      )}

      {checkoutStore.isCheckout && cl && (
        <div class="flex justify-center items-start bg-white  w-screen">
          {checkoutStore.issuer.name === "aplazo" && (
            <Checkoutaplazo credilink={cl} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "mp" && (
            <Checkoutmp credilink={cl} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "coppel" && (
            <Checkoutcoppel credilink={cl} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "kueski" && (
            <Checkoutkueski credilink={cl} checkout={checkoutStore} />
          )}
          {checkoutStore.issuer.name === "creditea" && (
            <CheckoutCreditea credilink={cl} checkout={checkoutStore} />
          )}
        </div>
      )}
    </div>
  );
});

export const head: DocumentHead = () => ({
  title: "Credilink CCP",
  meta: [
    { name: "robots", content: "noindex" },
    { name: "description", content: "Credilink ccp estático sin fetch" },
  ],
});
