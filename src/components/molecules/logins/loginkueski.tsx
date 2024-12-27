import { component$ } from "@builder.io/qwik";
import { CheckoutModel } from "~/models/checkout-model";
import kueskiLogo from "~/assets/kueskilogo.png";

export interface IProps {
    checkout: CheckoutModel;
}


export default component$((props: IProps) => {
    return (
        <div class="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header class="flex items-center justify-between p-4 border-b">
                <div class="flex items-center gap-2">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="text-blue-600"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span class="text-gray-800">Comercio</span>
                </div>
                <span class="font-mono">{props.checkout.userData.amount}</span>
            </header>

            <main class="flex-grow flex flex-col justify-center items-center px-4 py-8">
                <div class="w-full max-w-md">
                    {/* Logo */}
                    <div class="flex justify-center mb-12">
                        <img
                            class="max-w-[200px] self-center"
                            src={kueskiLogo}
                            alt="kueski-login-logo-1"
                        />
                        {/* <div class="text-2xl font-bold text-blue-600">
                            kueski<span class="text-green-500">.</span>
                        </div> */}
                    </div>

                    {/* Login Form */}
                    <div class="space-y-6">
                        <h1 class="text-2xl font-semibold text-center">Inicia sesión</h1>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-600 mb-1" for="email">
                                    Correo electrónico*
                                </label>
                                <input
                                    disabled
                                    id="email"
                                    type="email"
                                    placeholder="demo@fluxqr.com"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div class="relative">
                                <label class="block text-sm text-gray-600 mb-1" for="password">
                                    Contraseña*
                                </label>
                                <div class="relative">
                                    <input
                                        disabled
                                        id="password"
                                        type="password"
                                        value="password"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                    />
                                    <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            class="text-gray-400"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#"
                            class="block text-blue-600 text-sm text-center"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>

                        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 px-4 transition duration-300 ease-in-out"
                            preventdefault:click
                            onClick$={() => {
                                props.checkout.isLoading = true;
                                // console.log(props.checkout.isLoading)
                                setTimeout(() => {
                                    props.checkout.isLoading = false;
                                    props.checkout.isLogin = false;
                                    props.checkout.isCheckout = true;
                                    // console.log(props.checkout.isLoading)
                                }, 2000);
                            }}

                        >
                            Iniciar sesión
                        </button>

                        <div class="text-center space-y-4">
                            <p class="text-gray-600">
                                ¿Aún no tienes cuenta?{" "}
                                <a href="#" class="text-blue-600 hover:underline">
                                    Crear una cuenta
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer class="w-full p-4 text-center text-sm text-gray-500 space-x-4">
                <span>Kueski © 2024</span>
                <a href="#" class="hover:text-gray-700">Términos</a>
                <a href="#" class="hover:text-gray-700">Privacidad</a>
            </footer>
        </div>
    )
});

