import { $, component$, useSignal, useStore } from "@builder.io/qwik"
import { getExpDate } from "~/helpers/dates";
import { CheckoutModel } from "~/models/checkout-model";
import { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import { getTodaysDateInSpanish } from "~/helpers/dates";
import Header from "~/components/template/header"
import Footer from "~/components/template/footer"
import { Text } from "~/components/atoms/text"
import { modelStylesData } from "~/models/modelStyles";
import logoWhite from "../../../assets/flux_blanco.png"
import Qr from "~/components/atoms/qr"
import kueskiLogo from "../../../assets/loan/kueskipay_small.png"

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {

  const showQR = useSignal(false); // Inicializamos en false, se mostrará al completar
  const qrData = useStore<any>({});
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const checkoutSubmit = $(async () => {
    // Asumiendo que 'state' es alguna señal o store que contiene 'isLoading'
    // Si 'state' no está definido aquí, ajusta a 'props.checkout.isLoading' o similar.
    // Por el contexto del componente principal, asumo que es props.checkout.isLoading
    props.checkout.isLoading = true; // Activar el loader

    try {
      // Uso directo de las variables de entorno sin condicionales

      const dataCoupon = {
        commerce: "fd3cf595-fb08-4770-ba6e-01167c98ff7a",
        amount: Math.round(Number(props.checkout.userData.amount) * 100),
        expiration: `${getExpDate()}T05:59:59.999Z`, // Asegúrate que getExpDate() esté disponible
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
      {props.checkout.isLoading && <ModalLoading />}
      {!showQR.value && (
        <div class="min-h-screen bg-white max-w-2xl mx-auto">


          {/* Header */}
          <header class="flex items-center justify-between mb-8">
            <h1 class="text-1xl font-semibold">Detalle de tu compra</h1>
            <button class="text-blue-600 font-medium">Cancelar</button>
          </header>

          {/* Pre-approved Credit */}
          <div class="bg-gray-50 rounded-2xl p-4 mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1">
              <div class="w-12 h-12 bg-blue-600 rounded-full" />
              <div>
                <div class="text-2xl font-semibold text-blue-600">$24,800.00</div>
                <div class="text-gray-600">Crédito preaprobado</div>
              </div>
            </div>
            <svg
              class="w-6 h-6 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          {/* Store Information */}
          <div class="mb-8">
            <div class="text-gray-600 mb-2">Estás comprando en</div>
            <div class="text-xl font-medium">{props.credilink.commerceName}</div>
          </div>
          {/* Purchase Amount */}
          <div class="flex justify-between items-center mb-6">
            <div class="text-gray-900">Monto de la compra</div>
            <div class="font-mono text-xl">{`$${props.checkout.userData.amount}`}</div>
          </div>

          {/* Coupon Button */}
          <button class="flex items-center gap-2 text-blue-600 border border-blue-600 rounded-full px-4 py-2 mb-8">
            <span>Agregar cupón</span>
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Payment Plan */}
          <div class="mb-8">
            <h2 class="text-xl font-medium mb-4">Plan de pagos</h2>
            <div class="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span class="font-mono text-xl">{`$${(parseFloat(props.checkout.userData.amount) * 1.23 / 6).toFixed(2)}`}</span>
                <span class="text-gray-600 ml-2">por 6 quincenas</span>
              </div>
              <button class="text-blue-600 font-medium">Cambiar</button>
            </div>
          </div>

          {/* Payment Calendar */}
          <div class="mb-12">
            <h2 class="text-xl font-medium mb-4">Calendario de pagos</h2>
            <div class="bg-white border rounded-2xl p-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <div class="font-medium">Primer pago</div>
                  <div class="text-gray-600">{getTodaysDateInSpanish()}</div>
                </div>
              </div>
              <button class="text-blue-600 font-medium">Ver</button>
            </div>
          </div>

          {/* Total and Terms */}
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <div class="text-xl font-medium">Total a pagar</div>
              <div class="font-mono text-2xl font-semibold">{`$${(parseFloat(props.checkout.userData.amount) * 1.23).toFixed(2)}`}</div>
            </div>
            <p class="text-gray-600 text-sm">
              Al Comprar aceptas la oferta y tu contrato que estará disponible en tu cuenta.
            </p>
          </div>

          {/* Buy Button */}
          <button class="w-full bg-blue-600 text-white rounded-full py-4 font-medium hover:bg-blue-700 transition-colors"
            preventdefault:click
            onClick$={() => {
              checkoutSubmit();
            }}
            disabled={props.checkout.isLoading}
          >
            Comprar
          </button>
        </div>
      )} {showQR.value && (
        <div class={`flex h-screen w-screen flex-col place-content-center text-white sc600:w-[600px] ${modelStylesData.bgColor.gradient}`}>
          <div class="flex flex-col h-full w-full text-center text-white">
            <Header imgSrc={logoWhite} />
            <div class='flex flex-col gap-1 h-full items-center'>
              <div class='h-[20px]'></div>
              <img src={kueskiLogo} alt={kueskiLogo} width={150} height={50} />
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
                text={`Expira el ${formatDate(qrData.expiration)}`}
                size={modelStylesData.textSize.subtitle}
                weight={modelStylesData.textWeight.normal}
              />
            </div>
            <Footer isSlug={false} textBoxState={null} issuerNames={[""]} />
          </div>
        </div>
      )}
    </>


  )
});

