import { $, component$, useStore } from "@builder.io/qwik";
import { getExpDate } from "~/helpers/dates";
import { CheckoutModel } from "~/models/checkout-model";
import { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import coppelLogo from "~/assets/coppel.svg"


export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>
  const state = useStore({
    isLoading: false,
  });

  const checkoutSubmit = $(async (loanId: string) => {
    state.isLoading = true;
    // const expiresIn = new Date();
    // expiresIn.setHours(23, 59, 59, 0).toLocaleString();

    try {
      const baseUrl = envVars.apiUrlFlux;
      const dataCoupon = {
        commerce: props.credilink.commerce,
        amount: Math.round(Number(props.checkout.userData.amount) * 100),
        expiration: `${getExpDate()}T05:59:59.999Z`,
        // expiration: "2023-12-12T05:59:59.999Z",
        isPayable: false,
        customer: {
          name: "Usuario de prueba",
          email: props.checkout.userData.email,
        },
      };
      await fetch(`${baseUrl}coupons`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Important for JSON requests
        },
        body: JSON.stringify(dataCoupon),
      }).then(async (res) => {
        const data = await res.json();
        console.log("DATA :::::::::: ", data)
        if (data?.id?.length) {
          console.log(data.id)
          window.location.href = `/?loan=${data.id}`;
          try {
            const zapierData = {
              tel: `+52${props.checkout.userData.phone}`,
              id: data.id,
              imgUrl: `https://qr.fluxqr.net/?text=${encodeURIComponent(
                data.qr
              )}`,
              amount: `$${parseFloat(data.amount) / 100}`,
              commerce: props.credilink.commerceName,
              expiration: data.expiration,
              qr: data.qr,
            };
            console.log("zapierdata", zapierData);
            const zapierRes = await fetch(envVars.urlZapier, {
              method: "POST",
              body: JSON.stringify(zapierData),
            });
            const result = await zapierRes.json();
            console.log("success", result);
            if (zapierRes?.status === 200) {
              console.log(data);
              window.location.href = `/?loan=${data.id}`;
            }
          } catch (e) {
            console.log("error", e);
          }
          window.location.href = `/?loan=${data.id}`;
        } else {
          window.location.href = `/?loan=${loanId}`;
        }
      });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      props.checkout.isLoading = false;
      return;
    }, 3000);

  });

  return (
    <div class="max-w-[480px] mx-auto p-8 font-sans">
      <header class="mb-10 text-center">
        <div class="flex items-center justify-center gap-2 mb-1">
          <img
            class="max-w-[200px] self-start"
            src={coppelLogo}
            alt="coppel-img-1"
          />
        </div>
        <p class="text-[#003B7A] text-sm m-0">
          Tu mismo crédito, más posibilidades.
        </p>
      </header>

      <main class="space-y-6">
        <div>
          <h1 class="text-3xl font-normal mb-4">
            Finaliza tu compra
          </h1>
          <p class="text-gray-600 text-lg">
            Esta es la información de tus abonos, si estás de acuerdo, finaliza tu compra de flux qr
          </p>
        </div>

        <div class="border rounded-xl overflow-hidden">
          <div class="p-4 border-b">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Precio de contado</span>
              <span class="text-xl">{`$${parseFloat(props.checkout.userData.amount).toFixed(2)}`}</span>
            </div>
          </div>

          <div class="p-4 border-b">
            <div class="flex justify-between items-center mb-1">
              <span class="text-gray-600">Precio con crédito<br />Coppel Pay</span>
              <span class="text-right">
                <span class="text-xl">{`$${(parseFloat(props.checkout.userData.amount) * 1.45).toFixed(2)}`}</span>
                <span class="block text-gray-600">en 12 mensualidades</span>
              </span>
            </div>
            <button class="text-[#003B7A] text-sm flex items-center">
              Descubre como ahorrar intereses
              <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Tu abono mensual<br />será de</span>
              <span class="text-right">
                <span class="text-xl">{`$${Math.ceil((parseFloat(props.checkout.userData.amount) * 1.45 / 12)).toFixed(2)}`}</span>
                <span class="block text-gray-600">el día 29 de cada mes</span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <p class="text-gray-600 mb-2">Enviaremos tu recibo a este correo:</p>
          <div class="border rounded-lg p-4">
            {envVars.fixedEmail}
          </div>
        </div>

        <div class="flex items-start gap-3 text-gray-500">
          <svg class="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <p class="text-sm">
            Recuerda revisar la bandeja de correo no deseado y promociones
          </p>
        </div>

        <button class="w-full py-4 px-4 text-base font-medium text-white bg-[#003B7A] rounded-full hover:bg-[#002b5c] transition-colors duration-200"
          preventdefault:click
          onClick$={() => {
            checkoutSubmit(props.checkout.issuer.id);
          }}
          disabled={state.isLoading}

        >
          Finalizar Compra
        </button>
      </main>
    </div>
  )
})

