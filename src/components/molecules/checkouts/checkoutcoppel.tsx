import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { CheckoutModel } from "~/models/checkout-model";
import { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import coppelLogo from "~/assets/coppel.svg"
import CoppelLoan from "../../../assets/loan/coppel_loan.png"
import Header from "~/components/template/header"
import Footer from "~/components/template/footer"
import { Text } from "~/components/atoms/text"
import { modelStylesData } from "~/models/modelStyles";
import logoWhite from "../../../assets/flux_blanco.png"
import Qr from "~/components/atoms/qr"


export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  // NAVIGATES TO /?loan=<ID>
  const state = useStore({
    isLoading: false,
  });

  const showQR = useSignal(false); // Inicializamos en false, se mostrará al completar
  const qrData = useStore<any>({});
    const formattedExpirationDisplay = useSignal('');
    const formatDate = $((isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    })


    useTask$(async ({ track }) => {
        track(() => qrData.expiration); // Rastrea la propiedad expiration del store

        if (qrData.expiration) {
            // Llama a la QRL formatDate y await su resultado
            formattedExpirationDisplay.value = await formatDate(qrData.expiration);
        } else {
            formattedExpirationDisplay.value = ''; // Limpiar si no hay fecha
        }
    });


  const checkoutSubmit = $(async () => {
    // Asumiendo que 'state' es alguna señal o store que contiene 'isLoading'
    // Si 'state' no está definido aquí, ajusta a 'props.checkout.isLoading' o similar.
    // Por el contexto del componente principal, asumo que es props.checkout.isLoading
    props.checkout.isLoading = true; // Activar el loader

    try {
      // Uso directo de las variables de entorno sin condicionales
      const expirationDate = new Date();
      expirationDate.setHours(23, 59, 59, 999); // Ajusta a fin del día
      const expirationApiFormat = expirationDate.toISOString();
      const dataCoupon = {
        commerce: "fd3cf595-fb08-4770-ba6e-01167c98ff7a",
        amount: Math.round(Number(props.checkout.userData.amount) * 100),
        expiration: expirationApiFormat, // Asegúrate que getExpDate() esté disponible
        isPayable: false,
        customer: {
          name: "Usuario de prueba",
          email: props.checkout.userData.email,
        },
      };

      const res = await fetch(`${envVars.apiUrlFlux}/giftcards`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${envVars.refreshToken}`, // Usamos la variable directa
        },
        body: JSON.stringify(dataCoupon),
      });

      const data = await res.json();
      const response = data.data;

      if (response?.id?.length) {
        qrData.id = response.id;
        qrData.qr = response.qr;
        qrData.amount = response.amount;
        qrData.title = "Creditea";
        qrData.expiration = response.expiration;
        qrData.commerce = response.commerce;
        qrData.customer = response.customer;
        qrData.enabled = response.enabled;
        qrData.isPayable = response.isPayable;
        showQR.value = true; // Mostrar QR al éxito
        try {
          const formattedExpirationForZapier = await formatDate(qrData.expiration);
          const zapierData = {
              tel: `+52${props.checkout.userData.phone}`,
              id: qrData.id,
              imgUrl: `https://qr.fluxqr.net/?text=${encodeURIComponent(
                  data.qr
              )}`,
              amount: `$${parseFloat(qrData.amount) / 100}`,
              commerce: "Flux QR",
              expiration: formattedExpirationForZapier,
              qr: qrData.qr,
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
          }
      } catch (e) {
          console.log("error", e);
      }
      } else {
        console.error("No se recibió un ID de préstamo válido de la API.");
        // Manejar caso de error si la API no devuelve ID
      }
    } catch (err) {
      console.error("Error en checkoutSubmit:", err);
    } finally {
      props.checkout.isLoading = false; // 3 segundos de ejemplo, ajustar
    }
  });

  return (
    <>
      {!showQR.value && (
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
                  <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                checkoutSubmit();
              }}
              disabled={state.isLoading}

            >
              Finalizar Compra
            </button>
          </main>
        </div>
      )
      } {showQR.value && (
        <div class={`flex h-screen w-screen flex-col place-content-center text-white sc600:w-[600px] ${modelStylesData.bgColor.gradient}`}>
          <div class="flex flex-col h-full w-full text-center text-white">
            <Header imgSrc={logoWhite} />
            <div class='flex flex-col gap-1 md:gap-4 h-full items-center'>

              <div class='h-[30px]'></div>
              <img src={CoppelLoan} alt={coppelLogo} width={150} height={50} />
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
                url={`https://qr.fluxqr.net/?text=${encodeURIComponent(qrData.qr)}`}
              />
              <Text
                text={"Monto aprobado:"}
                size={modelStylesData.textSize.subtitle}
                weight={modelStylesData.textWeight.normal}
              />
              <p class='text-[12px] sc200:text-[22px] sc300:text-[30px] sc400:text-[36px] sc500:text-[46px]'>
                {"$" + (parseFloat(qrData.amount as any) / 100).toFixed(2)}
              </p>
              <Text
                text={`Expira el ${formattedExpirationDisplay.value}`}
                size={modelStylesData.textSize.tiny
                }
                weight={modelStylesData.textWeight.normal}
              />
            </div>
            <Footer isSlug={false} textBoxState={null} issuerNames={[""]} />
          </div>
        </div>
      )}
    </>
  )
})

