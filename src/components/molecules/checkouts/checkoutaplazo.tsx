import { $, component$, useSignal, useStore } from '@builder.io/qwik'
import aplazoLogo from '../../../assets/aplazo.svg'
import mc from '../../../assets/Mastercard-logo.png'
import codi from '../../../assets/codi.png'
import { modelStylesData } from '~/models/modelStyles'
import { Credilink } from '~/models/credilink-model'
import { CheckoutModel } from '~/models/checkout-model'
import { envVars } from '~/models/global-vars'
import { getExpDate } from '~/helpers/dates'
import Header from "~/components/template/header"
import Footer from "~/components/template/footer"
import { Text } from "~/components/atoms/text"
import logoWhite from "../../../assets/flux_blanco.png"
import Qr from "~/components/atoms/qr"
import aplazpLoan from "../../../assets/loan/aplazo_small.png"


export interface IProps {
    credilink: Credilink;
    checkout: CheckoutModel;
}

export default component$((props: IProps) => {
    // NAVIGATES TO /?loan=<ID>
    const state = useStore({
        currentRadio: "",
        isLoading: false,
    });
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
        <>{!showQR.value && (
            <div class="font-sans max-w-md mx-auto p-6 bg-white rounded-2xl">
            {/* Header */}
            <div class="relative mb-4">
                <img
                    src={aplazoLogo}
                    alt="Aplazo"
                    class="h-8 mx-auto"
                />
                <button class="absolute right-0 top-0 text-gray-400 text-2xl">&times;</button>
            </div>

            <h1 class={`${modelStylesData.textSize.title} text-center font-bold mb-4`}>Confirma tu compra</h1>

            {/* Purchase Details */}
            <div class={`mb-4 ${modelStylesData.textSize.normal}`}>
                <button class="w-full text-left py-3 flex justify-between items-center border-b">
                    <span>Ver detalles de compra</span>
                    <span>▼</span>
                </button>

                <div class="space-y-4 py-4">
                    <div class="flex justify-between">
                        <span>Carrito</span>
                        <span>{`$${parseFloat(props.checkout.userData.amount).toFixed(2)}`}</span>
                    </div>

                    <div class="flex justify-between">
                        <span>Código de descuento</span>
                        <button class="text-blue-600">Agregar</button>
                    </div>

                    <div class="flex justify-between">
                        <span>Subtotal (IVA incluido)</span>
                        <span>{`$${parseFloat(props.checkout.userData.amount).toFixed(2)}`}</span>
                    </div>

                    <div class="flex justify-between">
                        <span>Comisión por servicio</span>
                        <span>{`$${((parseFloat(props.checkout.userData.amount) * 0.18).toFixed(2))}`}</span>
                    </div>

                    <div class="flex justify-between font-bold">
                        <span>Total de tu compra</span>
                        <span>{`$${(parseFloat(props.checkout.userData.amount) * 1.18).toFixed(2)}`}</span>
                    </div>
                </div>
            </div>

            {/* Payment Plan */}
            <div class={`mb-4 ${modelStylesData.textSize.normal}`}>
                <h2 class="font-bold mb-4">TU PLAN DE PAGOS</h2>
                <div class="relative">
                    <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    {[
                        { date: 'Paga hoy', amount: `$${((parseFloat(props.checkout.userData.amount) * 1.18) / 5).toFixed(2)}`, active: true },
                        { date: '01 de ene', amount: `$${((parseFloat(props.checkout.userData.amount) * 1.18) / 5).toFixed(2)}` },
                        { date: '16 de ene', amount: `$${((parseFloat(props.checkout.userData.amount) * 1.18) / 5).toFixed(2)}` },
                        { date: '31 de ene', amount: `$${((parseFloat(props.checkout.userData.amount) * 1.18) / 5).toFixed(2)}` },
                        { date: '15 de feb', amount: `$${((parseFloat(props.checkout.userData.amount) * 1.18) / 5).toFixed(2)}` }
                    ].map((payment, i) => (
                        <div key={i} class="flex items-center mb-4 relative">
                            <div class={`w-5 h-4 rounded-full ${payment.active ? 'bg-cyan-400' : 'bg-white border-2 border-gray-200'} mr-4`}></div>
                            <div class="flex justify-between w-full">
                                <span class={payment.active ? 'font-bold' : 'text-gray-500'}>{payment.date}</span>
                                <span class={payment.active ? 'font-bold' : 'text-gray-500'}>{payment.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Methods */}
            <div class={`mb-2 ${modelStylesData.textSize.normal}`}>
                <h2 class="font-bold mb-2">MÉTODOS DE PAGO</h2>
                <div class="space-y-4">
                    <label class="flex items-center p-4 border rounded-lg">
                        <input type="radio" name="payment" class="mr-4" />
                        <img src={codi} alt="CoDi" class="h-8 mr-2" />
                        <span>CoDi®</span>
                    </label>

                    <label class="flex items-center p-4 border rounded-lg">
                        <input type="radio" name="payment" class="mr-4" />
                        <div class="flex items-center">
                            <img src={mc} alt="Mastercard" class="h-8 mr-2" />
                            <span>•••• 7397</span>
                        </div>
                        <button class="ml-auto text-blue-600">Reemplazar</button>
                    </label>
                </div>
            </div>

            {/* Confirm Button */}
            <button class={`w-full bg-black text-white py-4 rounded-full font-bold ${modelStylesData.textSize.normal}`}
                preventdefault:click
                onClick$={() => {
                    checkoutSubmit();
                }}
                disabled={state.isLoading}
            >
                CONFIRMAR PAGO
            </button>
        </div>
        )}
        {showQR.value && (
        <div class={`flex h-screen w-screen flex-col place-content-center text-white sc600:w-[600px] ${modelStylesData.bgColor.gradient}`}>
          <div class="flex flex-col h-full w-full text-center text-white">
            <Header imgSrc={logoWhite} />
            <div class='flex flex-col gap-4 h-full items-center'>
              <div class='h-[30px]'></div>
              <img src={aplazpLoan} alt={aplazpLoan} width={200} height={60} />
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
})