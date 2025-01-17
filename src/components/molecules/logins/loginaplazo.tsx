import { component$ } from "@builder.io/qwik";
import { CheckoutModel } from "~/models/checkout-model";
import aplazoLogo from "~/assets/aplazo.svg";
import mex from "~/assets/Flag_of_Mexico.svg";

export interface IProps {
    checkout: CheckoutModel;
}

export default component$((props: IProps) => {

    return (
        <div class="max-w-[480px] mx-auto p-6 font-sans">
            <div class="relative mb-8">
                <img
                    src={`${aplazoLogo}?height=32&width=120`}
                    alt="Aplazo"
                    class="mx-auto h-8"
                />
                <button class="absolute right-0 top-0 text-gray-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <h1 class="text-[28px] font-semibold text-center mb-8">
                Inicia sesión
            </h1>

            <div class="mb-8">
                <label class="block text-sm mb-2">
                    Número celular
                </label>
                <div class="flex items-center gap-2 p-4 rounded-full border border-gray-200">
                    <div class="flex items-center gap-2">
                        <img
                            src={`${mex}?height=20&width=28`}
                            alt="MX"
                            class="w-7 h-5 object-cover"
                        />
                        <span class="text-gray-600">+52</span>
                    </div>
                    <div class="w-px h-6 bg-gray-200"></div>
                    <input
                        disabled
                        type="tel"
                        placeholder={props.checkout.userData.phone || "5232312312"}
                        class="flex-1 border-none p-0 focus:outline-none text-lg"
                    />
                </div>
            </div>

            <button class="w-full py-4 px-6 text-white bg-black rounded-full font-medium mb-6"
                preventdefault:click
                onClick$={() => {
                    props.checkout.isLoading = true;
                    setTimeout(() => {
                        props.checkout.isLoading = false;
                        props.checkout.isLogin = false;
                        props.checkout.isCheckout = true;
                    }, 2000);
                }}
            >
                CONTINUAR
            </button>

            <p class="text-gray-500 text-sm text-center mb-8">
                Este sitio esta protegido por reCAPTCHA y Google.
                <br />
                Consulta el{' '}
                <a href="#" class="text-[#4285f4]">Aviso de privacidad</a>
                {' '}y{' '}
                <a href="#" class="text-[#4285f4]">Términos del servicio</a>.
            </p>

            <div class="bg-[#FDF8F4] rounded-2xl p-6 mb-8">
                <div class="flex gap-4">
                    {/* <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Delivery"
                        class="w-12 h-12"
                    /> */}
                    <h2 class="text-xl text-center font-semibold">
                        Explora entre las tiendas y comercios afiliados
                    </h2>
                </div>
                <div class="flex justify-center gap-2 mt-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            class={`w-2 h-2 rounded-full ${i === 1 ? 'bg-black' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            <p class="text-center text-gray-600 text-sm">
                Aplican{' '}
                <a href="#" class="font-semibold text-black">
                    Términos y Condiciones.
                </a>
                {' '}Sujeto a aprobación de crédito.
            </p>
        </div>
    )
})

