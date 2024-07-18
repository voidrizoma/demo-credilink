import { component$ } from "@builder.io/qwik";
import logo from "../../../assets/kueski.svg";
import mp1 from "../../../assets/login/mp1.png";
import mp2 from "../../../assets/login/mp2.png";
import { envVars } from "~/models/global-vars";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
    checkout: CheckoutModel;
}

export default component$((props: IProps) => {
    console.log(props);
    return (
        <>
            <div class="flex flex-col place-content-center gap-6">
                <img src={logo} alt="kueski-logo" class="my-[20px] h-[30px]" />
                <div class="flex flex-col items-center px-4 gap-3">
                    <p class="font-bold text-[24px]">Inicia sesión</p>
                    <div class="h-[10px]"></div>
                    <input
                        class="rounded-[10px] w-[320px] h-[52px] pl-4 border-solid border-[1px] border-[#b4b2b2] text-[16px] bg-white"
                        placeholder={envVars.fixedEmail}
                        disabled
                    />
                    <input
                        class="rounded-[10px] w-[320px] h-[52px] pl-4 border-solid border-[1px] border-[#b4b2b2] text-[16px] bg-white"
                        value="password"
                        type="password"
                        disabled
                        pattern=""
                        placeholder={envVars.fixedEmail}
                    />
                    <a href="" class="text-[#0075ff] font-bold self-start">¿Olvidaste tu contraseña?</a>
                    <button
                        class="rounded-[50px] w-[320px] h-[52px] mt-3 text-white bg-[#0075ff]"
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
                    <div class="flex flex-row gap-3 w-full items-start">
                        <p>¿Aún no tienes cuenta?</p>
                        <a href="" class="text-[#0075ff] font-bold self-start">Crear una cuenta</a>
                    </div>
                    <div class="h-[30px]"></div>
                    <div class="flex flex-row gap-3 text-[12px] text-[#b4b2b2] w-full justify-end">
                        <p class='text-grey'>Kueski 2024</p>
                        <p class='text-grey'>Términos</p>
                        <p class='text-grey'>Privacidad</p>
                    </div>
                </div>
            </div>
        </>
    );
});
