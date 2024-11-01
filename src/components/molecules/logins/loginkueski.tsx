import { component$ } from "@builder.io/qwik";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
    checkout: CheckoutModel;
}

// #0075ff

export default component$((props: IProps) => {
    console.log(props);

    return (
        <>
            <div class="flex flex-col place-content-center gap-6 px-[10px]">
                {/* <img src={logo} alt="kueski-logo" class="my-[20px] h-[30px]" /> */}
                <div class="flex flex-col px-4 gap-3">
                    <div class="h-[20px]"></div>
                    <div class="flex">
                        <p class="items-start font-bold text-[24px]">Verifica tu identidad</p>
                    </div>
                    <p class='sc350:text-sm text-md'>Ingresa el NIP que te enviamos por SMS y WhatsApp al número <span class='font-bold'>****** 16.</span> </p>
                    <p>Código <span class='font-bold sc350:text-sm text-md'>482557</span> </p>
                    <p class='font-semibold sc350:text-sm text-md'>NIP</p>
                    <div class={`flex justify-center gap-2`}>
                        {[1, 2, 3, 4, 5, 6].map((value, index) => (
                            <input
                                key={index + "  " +  value}
                                type="text"
                                class="text-[22px] font-bold sc350:w-12 sc350:h-14 w-14 h-16 border-[2px] border-gray-300  rounded-[12px] text-center bg-white"
                                maxLength={1}
                                value={value}
                                disabled
                            />
                        ))}
                    </div>
                    <div class='flex flex-row gap-2'>
                        <p class='sc350:text-[12px] text-[16px] font-semibold'>¿No recibiste el NIP?</p>
                        <p class='sc350:text-[12px] text-[16px] self-end'>Reenviar NIP: 01:19</p>

                    </div>
                    <div class="h-[10px]"></div>
                    <div class='flex flex-row gap-2'>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                class="self-start border-blue-500 rounded-md text-blue-500 focus:ring-blue-500"
                                onChange$={(ev) => {
                                    (ev.target as HTMLInputElement).value = (ev.target as HTMLInputElement).value
                                }}
                                onInput$={(ev) => (ev.target as HTMLInputElement).value = (ev.target as HTMLInputElement).value
                                }
                            />
                        </div>
                        <p class='sc350:text-xs text-sm'>
                            Por este conducto autorizo expresamente a Kueski, S.A.P.I de C.V, SOFOM E.N.R., Para qué A través de sus funcionarios facultados realice Las investigaciones correspondientes sobre mi comportamiento e historial crediticio Ante las sociedades de información crediticia.
                        </p>
                    </div>
                    <div class="h-[10px]"></div>
                    <a href="" class="text-[#0075ff] font-bold sc350:text-md self-center">Ver más</a>
                    <div class="h-[30px]"></div>
                    <button
                        class="self-center sc350:rounded-[40px] rounded-[50px] sc350:w-[256px] sc350:h-[42px] w-[320px] h-[52px] mt-3 text-white text-[20px] bg-[#0075ff]"
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
                        Verificar
                    </button>
                    <div class="h-[30px]"></div>
                </div>
            </div>
        </>
    );
});
