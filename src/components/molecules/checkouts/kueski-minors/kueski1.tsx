import { component$ } from "@builder.io/qwik";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
    checkout: CheckoutModel;
}


export default component$((props: IProps) => {
    const items = [
        { text1: '$154.00 x 4 quincenas', text2: '$600.14 total con intereses', selected: true },
        { text1: '$154.00 x 4 quincenas', text2: '$600.14 total con intereses', selected: false },
        { text1: '$154.00 x 4 quincenas', text2: '$600.14 total con intereses', selected: false },
    ]
    return <>
        <div class="flex flex-col place-content-end bg-zinc-200 bg-opacity-90 fixed inset-0 z-10 max-h-screen">
            <div class='flex flex-col gap-3 h-4/6 bg-white rounded-t-[25px] px-4'>
                <div class="h-[20px]"></div>
                <div class="flex">
                    <p class="items-start font-bold sc350:text-[18px] text-[24px]">Seleccionar quincenas</p>
                </div>
                <p class='sc350:text-sm text-md text-zinc-500'>El pago de la última quincena puede variar.</p>
                {items.map((e, i) =>
                    <div key={`${i} kueski-quincena`} class={`flex items-center gap-3 border-[2px] p-4 rounded-[15px] ${e.selected ? 'border-[#0075ff]' : 'border-[#d1d6dd]'}`}>

                        <div class={`w-4 h-4 rounded-full flex items-center justify-center ${e.selected ? 'bg-blue-500' : 'bg-white border-[#d1d6dd] border-[1px]'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div class='flex flex-col'>
                            <p class="sc350:text-sm text-md text-zinc-500">{e.text1}</p>
                            <p class="sc350:text-sm text-md text-zinc-500">{e.text2}</p>
                        </div>
                    </div>
                )}
                <button
                    class="self-center rounded-[50px] sc350:rounded-[40px] sc350:w-[256px] sc350:h-[42px] w-[320px] h-[52px] mt-3 text-white text-[20px] bg-[#0075ff]"
                    preventdefault:click
                    onClick$={() => {
                        props.checkout.isLoading = true;
                        // console.log(props.checkout.isLoading)
                        setTimeout(() => {
                            props.checkout.isLoading = false;
                            props.checkout.isFinalStep = true;
                        }, 1500);
                    }}
                >
                    Continuar
                </button>
            </div>
        </div>
    </>
})