import { component$, useSignal, useStore, $, useComputed$ } from "@builder.io/qwik"
import { getExpDate } from "~/helpers/dates"
// Eliminamos la importación del Modal externo
// import Modal from '~/components/molecules/Modal/Modal'; 
import { CheckoutModel } from "~/models/checkout-model"
import { Credilink } from "~/models/credilink-model"
import Header from "~/components/template/header"
import Footer from "~/components/template/footer"
import { Text } from "~/components/atoms/text"
import { modelStylesData } from "~/models/modelStyles";
import logoWhite from "../../../assets/flux_blanco.png"
import Qr from "~/components/atoms/qr"
import { envVars } from "~/models/global-vars"
import crediteaLoan from "../../../assets/loan/crediteaPay.png"
// No importamos Input ya que no habrá un input de monto interno aquí.
// import { Input } from "~/components/atoms/Input/Input"; 

// Interfaces
interface CrediteaData {
  purchaseAmount: number
  discountAmount: number
  finalAmount: number
  totalCredit: number
  biweeklyPayment: number
  promoCode?: string
}

interface CrediteaFlowProps {
  // Eliminamos purchaseAmount de las props, ya que viene de checkout.userData.amount
  credilink?: Credilink
  checkout?: CheckoutModel
}

export default component$<CrediteaFlowProps>(
  ({
    // Eliminamos purchaseAmount del destructuring.
    // El valor de checkout.userData.amount ya viene en el prop `checkout`.
    checkout = {
      isLoading: false,
      // CAMBIO AQUÍ: Monto por defecto es una cadena vacía, no un número hardcodeado
      userData: { amount: "", email: "", phone: "" },
      issuer: { id: "demo-issuer-id" },
    },
  }) => {
    const currentStep = useSignal(1)
    const showQR = useSignal(true); // Inicializamos en false, se mostrará al completar
    const qrData = useStore<any>({});

    // Loading state para el componente CrediteaFlow
    const state = useStore({
      isLoading: false,
    })

    // Form states
    const firstName = useSignal("")
    const middleName = useSignal("")
    const lastName = useSignal("")
    const motherLastName = useSignal("")
    const email = useSignal("")
    const acceptNews = useSignal(false)
    const curp = useSignal("")
    const phone = useSignal("")
    const acceptTerms = useSignal(false)
    const promoCode = useSignal("HOTSALEMS") // Valor por defecto

    // --- LÓGICA PARA CALCULAR CREDITEADATA DE FORMA REACTIVA DESDE checkout.userData.amount ---
    const crediteaData = useComputed$((): CrediteaData => {
      // Obtenemos el monto del CheckoutModel (convertimos a número)
      const parsedAmount = parseFloat(checkout.userData.amount || "0");
      const currentPurchaseAmount = isNaN(parsedAmount) ? 0 : parsedAmount;

      const discountAmount = currentPurchaseAmount * 0.3; // 30% de descuento
      const finalAmount = currentPurchaseAmount - discountAmount;
      const totalCredit = 10000.0; // Valor fijo, ajusta si es dinámico
      // CORRECCIÓN AQUÍ: Cambiado finalPurchaseAmount a finalAmount
      const biweeklyPayment = finalAmount / 6; // 6 quincenas

      return {
        purchaseAmount: currentPurchaseAmount,
        discountAmount,
        finalAmount,
        totalCredit,
        biweeklyPayment,
        promoCode: promoCode.value, // Usa la señal promoCode
      };
    });

    const checkoutSubmit = $(async () => {
      state.isLoading = true;

      try {
        const dataCoupon = {
          commerce: "fd3cf595-fb08-4770-ba6e-01167c98ff7a", // Asume un ID de comercio fijo para este flujo
          amount: Math.round(crediteaData.value.finalAmount * 100), // Usar el finalAmount calculado
          expiration: `${getExpDate()}T05:59:59.999Z`,
          isPayable: false,
          customer: {
            name: `${firstName.value} ${lastName.value}`, // Usar los nombres ingresados
            email: email.value || checkout.userData.email,
          },
        };

        const res = await fetch(`${envVars.apiUrlFlux}/giftcards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${envVars.refreshToken}`,
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
        setTimeout(() => {
          state.isLoading = false;
        }, 3000); // 3 segundos de ejemplo, ajustar
      }
    });

    const handleNext = $(() => {
      // Validar campos de registro antes de avanzar al siguiente paso
      if (currentStep.value === 1) {
        const isStep1FormValid = firstName.value && lastName.value && motherLastName.value && email.value;
        if (!isStep1FormValid) {
          console.warn("Faltan campos obligatorios en el registro.");
          // Aquí puedes mostrar un mensaje de error general para el formulario
          return;
        }
      }

      if (currentStep.value < 4) {
        currentStep.value = currentStep.value + 1
      }
    })
    const formatDate = (isoDate: string) => {
      const date = new Date(isoDate);
      return date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
    const handleComplete = $(() => {
      checkoutSubmit()
    })

    // Loading Modal Component: Definición interna como estaba antes
    const ModalLoading = component$(() => (
      <div class=" m-4 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 flex items-center gap-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Procesando tu compra...</span>
        </div>
      </div>
    ))

    // Mobile Header Component
    const MobileHeader = component$(() => (
      <div class="bg-gray-800 text-white p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2 text-sm">
            <span>9:04</span>
            <div class="flex gap-1">
              <div class="w-4 h-2 bg-white rounded-sm"></div>
              <div class="w-4 h-2 bg-white rounded-sm"></div>
              <div class="w-4 h-2 bg-white rounded-sm"></div>
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm">
            <div class="flex gap-1">
              <div class="w-4 h-2 bg-white rounded-sm"></div>
              <div class="w-4 h-2 bg-white rounded-sm"></div>
              <div class="w-4 h-2 bg-white rounded-sm"></div>
            </div>
            <span>62%</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <div class="w-5 h-5 bg-white rounded"></div>
          </div>
          <div class="text-center">
            <div class="font-medium">Creditea</div>
            <div class="text-xs text-gray-300">commerce.creditea.com</div>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>
      </div>
    ))

    // Creditea Logo Component
    const CrediteaLogo = component$(() => (
      <div class="bg-teal-700 text-white p-4 flex items-center">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white transform rotate-45"></div>
          <span class="text-xl font-bold">creditea</span>
        </div>
      </div>
    ))

    // Step Indicator Component
    const StepIndicator = component$(() => (
      <div class="flex items-center justify-center gap-4 py-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} class="flex items-center">
            <div
              class={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${i + 1 <= currentStep.value ? "bg-teal-700" : "bg-gray-300"
                }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div class={`w-16 h-1 ${i + 1 < currentStep.value ? "bg-teal-700" : "bg-gray-300"}`} />}
          </div>
        ))}
      </div>
    ))

    // Step 1: Registration
    const Step1Registration = component$(() => {
      // isFormValid ahora solo incluye los campos de registro, el monto viene de fuera
      const isFormValid = useComputed$(() => {
        // Asegúrate de que el monto de entrada sea válido y mayor que cero si se necesita aquí
        // Aunque el monto viene de `checkout.userData.amount`, si este paso necesita validarlo, se haría.
        // Por ahora, solo los campos de nombre/email.
        return firstName.value && lastName.value && motherLastName.value && email.value;
      });

      return (
        <div class="p-6 max-w-md mx-auto">
          <h1 class="text-2xl font-bold text-center mb-8 text-teal-700">Regístrate, por favor</h1>

          <div class="space-y-4 mb-6">
            {/* NO HAY INPUT PARA EL MONTO DE COMPRA AQUÍ */}

            <input
              placeholder="Nombre"
              value={firstName.value}
              onInput$={(e) => (firstName.value = (e.target as HTMLInputElement).value)}
              class="w-full h-12 px-4 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
            />

            <input
              placeholder="Segundo nombre (en caso de tenerlo)"
              value={middleName.value}
              onInput$={(e) => (middleName.value = (e.target as HTMLInputElement).value)}
              class="w-full h-12 px-4 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
            />

            <input
              placeholder="Apellido paterno"
              value={lastName.value}
              onInput$={(e) => (lastName.value = (e.target as HTMLInputElement).value)}
              class="w-full h-12 px-4 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
            />

            <input
              placeholder="Apellido materno"
              value={motherLastName.value}
              onInput$={(e) => (motherLastName.value = (e.target as HTMLInputElement).value)}
              class="w-full h-12 px-4 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
            />

            <input
              placeholder="Correo electrónico"
              type="email"
              value={email.value}
              onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
              class="w-full h-12 px-4 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div class="flex items-start gap-3 mb-8">
            <input
              type="checkbox"
              checked={acceptNews.value}
              onChange$={(e) => (acceptNews.value = (e.target as HTMLInputElement).checked)}
              class="mt-1"
            />
            <p class="text-sm text-gray-600">Deseo recibir noticias sobre ofertas y otras promociones de Creditea.</p>
          </div>

          <button
            onClick$={handleNext}
            disabled={!isFormValid.value}
            class={`w-full h-12 rounded-2xl font-medium ${isFormValid.value
              ? "bg-gray-400 hover:bg-gray-500 text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Siguiente
          </button>

          <div class="mt-8 text-center">
            <div class="font-bold text-lg mb-2">IPF Digital México</div>
            <div class="text-blue-600 font-medium">(55)7099-1111</div>
          </div>
        </div>
      )
    })

    // Step 2: Welcome
    const Step2Welcome = component$(() => (
      <div class="p-6 max-w-md mx-auto">
        <div class="flex items-start justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold mb-4">Bienvenido a Creditea</h1>
            <p class="text-gray-600">Compártenos tu información básica para iniciar el proceso.</p>
          </div>
          <div class="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
        </div>

        <div class="bg-blue-50 rounded-2xl p-6 mb-8">
          <div class="mb-6">
            <div class="text-teal-700 font-medium mb-2">Monto de la compra:</div>
            <div class="text-3xl font-bold line-through text-gray-500">
              ${crediteaData.value.purchaseAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div class="mb-6">
            <div class="text-teal-700 font-medium mb-2">Monto de la compra de promoción:</div>
            <div class="text-3xl font-bold">
              ${crediteaData.value.finalAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div class="text-center">
            <div class="font-bold mb-1">¡Sin intereses!</div>
            <div class="text-sm text-gray-600">Si pagas en las primeras</div>
            <div class="text-sm text-gray-600">4 quincenas</div>
            <div class="text-sm text-gray-600">tu saldo total</div>
          </div>
        </div>

        <div class="space-y-4 mb-6">
          <input
            placeholder="Ingresa tu CURP*"
            value={curp.value}
            onInput$={(e) => (curp.value = (e.target as HTMLInputElement).value)}
            class="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none"
          />
          <input
            placeholder="Tu número celular*"
            value={phone.value}
            onInput$={(e) => (phone.value = (e.target as HTMLInputElement).value)}
            class="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div class="flex items-start gap-3 mb-6">
          <div class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-1">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <p class="text-sm text-gray-600">
            Si ya eres nuestro usuario, por favor ingresa el mismo número telefónico que usaste para registrarte
          </p>
        </div>

        <div class="flex items-start gap-3 mb-8">
          <input
            type="checkbox"
            checked={acceptTerms.value}
            onChange$={(e) => (acceptTerms.value = (e.target as HTMLInputElement).checked)}
            class="mt-1"
          />
          <p class="text-sm">
            * He leído y acepto los{" "}
            <span class="text-blue-600 underline">Términos y condiciones de uso de crédito para Creditea</span>
          </p>
        </div>

        <button
          onClick$={handleNext}
          disabled={!curp.value || !phone.value || !acceptTerms.value}
          class="w-full h-12 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-lg font-medium disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    ))

    // Step 3: Final Confirmation
    const Step3FinalConfirmation = component$(() => (
      <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-8">¡Gracias por elegir Creditea como tu medio de pago!</h1>

        <div class="bg-blue-50 rounded-2xl p-6 mb-8">
          <div class="text-center mb-6">
            <div class="font-bold text-lg mb-2">Sin intereses si pagas en las primeras</div>
            <div class="font-bold text-xl">4 quincenas</div>
          </div>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-gray-700">Monto de la compra</span>
              <span class="line-through text-gray-500">
                ${crediteaData.value.purchaseAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-700">Monto de la compra de promoción</span>
              <span class="font-bold">
                ${crediteaData.value.finalAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <div class="text-gray-700 mb-2">Código promocional</div>
            <div class="flex gap-2">
              <input
                value={promoCode.value}
                onInput$={(e) => (promoCode.value = (e.target as HTMLInputElement).value)}
                class="flex-1 px-4 py-2 bg-gray-200 rounded-lg"
                disabled
              />
              <button class="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-lg">Confirmar</button>
            </div>
            <div class="text-purple-600 text-sm mt-2">
              ¡Código promocional aprobado! <span class="underline">Ver más</span>
            </div>
          </div>

          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 bg-teal-700 rounded flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <p class="text-sm">
              * He leído y acepto los{" "}
              <span class="text-teal-700 underline">términos y condiciones de uso de la página web</span>
            </p>
          </div>

          <button
            onClick$={handleNext}
            class="w-full h-12 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-medium"
          >
            Continuar
          </button>
        </div>

        <p class="text-xs text-gray-600 text-center">
          La oferta final será otorgada en función de tu perfil crediticio y nuestras políticas internas. Comprar con
          Creditea te da la oportunidad de obtener una Línea de Crédito de hasta $70,000 pesos.
        </p>
      </div>
    ))

    // Step 4: Credit Confirmation
    const Step4CreditConfirmation = component$(() => (
      <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">¡Felicidades! Tu crédito está pre-aprobado</h1>

        <p class="text-gray-600 mb-8">Confirma los detalles de tu crédito para continuar con la compra</p>

        <div class="space-y-4 mb-8">
          <div class="flex justify-between items-center">
            <span class="text-gray-700">Monto de tu compra</span>
            <span class="line-through text-gray-500">
              ${crediteaData.value.purchaseAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-700">Cupón de descuento</span>
            <span class="text-green-600">
              -${crediteaData.value.discountAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <hr class="border-gray-300" />

          <div class="flex justify-between items-center font-bold text-lg">
            <span>Monto total a crédito</span>
            <span>${crediteaData.value.finalAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div class="mb-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-700">Crédito total pre-aprobado</span>
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9,9h0a3,3,0,0,1,3-3h0a3,3,0,0,1,3,3v1a3,3,0,0,1-3,3h0" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <div class="text-2xl font-bold">
            ${crediteaData.value.totalCredit.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div class="mb-8">
          <h3 class="font-bold text-lg mb-4">Forma de pago</h3>
          <p class="text-gray-600 mb-4">
            El cargo mínimo se cobrará automáticamente cada quincena en la tarjeta que registres.
          </p>

          <div class="bg-gray-50 rounded-2xl p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-700">Paga a tu ritmo</span>
              <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Cargo automático</span>
            </div>
            <div class="font-bold text-lg">
              Quincenas de ${crediteaData.value.biweeklyPayment.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <button
          onClick$={handleComplete}
          disabled={state.isLoading}
          class={`w-full h-12 rounded-lg font-medium ${state.isLoading
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {state.isLoading ? "Procesando..." : "Comprar"}
        </button>
      </div>
    ))

    const renderStep = () => {
      switch (currentStep.value) {
        case 1:
          return <Step1Registration />
        case 2:
          return <Step2Welcome />
        case 3:
          return <Step3FinalConfirmation />
        case 4:
          return <Step4CreditConfirmation />
        default:
          return <Step1Registration />
      }
    }

    return (
      <div class="sm:p-6 md:p-8 min-h-screen bg-gray-50 rounded-lg shadow-md">
        {/* Usamos el ModalLoading definido internamente */}
        {state.isLoading && <ModalLoading />}
        {!showQR.value && (
          <>
            <MobileHeader />
            <CrediteaLogo />
            <StepIndicator />
            <div class="bg-white min-h-screen rounded-lg p-6 sm:p-8 md:p-10 shadow-inner">
              {renderStep()}
            </div>
          </>
        )}
        {showQR.value && (
          <div class={`flex h-screen w-screen flex-col place-content-center text-white sc600:w-[600px] ${modelStylesData.bgColor.gradient}`}>
            <div class="flex flex-col h-full w-full text-center text-white">
              <Header imgSrc={logoWhite} />
              <div class='flex flex-col gap-4 h-full items-center'>
                <div class='h-[30px]'></div>
                <img src={crediteaLoan} alt={crediteaLoan} width={200} height={60}/>
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
      </div>
    )
  },
)
