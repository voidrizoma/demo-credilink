import { component$, QRL } from "@builder.io/qwik";
import { getFutureDateInSpanish, getTodaysDateInSpanish } from "~/helpers/dates";
import { CheckoutModel } from "~/models/checkout-model";

export interface IProps {
    checkout: CheckoutModel;
    checkoutSubmit: QRL<(id: string) => void>;

}

export default component$((props: IProps) => {
    const items = [
        { text1: getTodaysDateInSpanish(), text2: '$154.00', dotsize: 'w-4 h-4' },
        { text1: getFutureDateInSpanish(15), text2: '$154.00', dotsize: 'w-2 h-2' },
        { text1: getFutureDateInSpanish(31), text2: '$154.00', dotsize: 'w-2 h-2' },
        { text1: getFutureDateInSpanish(46), text2: '$141.00', dotsize: 'w-2 h-2' },
    ]
    return <>
        <div class="flex flex-col place-content-end bg-zinc-200 bg-opacity-90 fixed inset-0 z-10 h-screen">
            <div class='flex flex-col gap-3 h-4/6 bg-white rounded-t-[25px] px-4'>
                <div class="h-[20px]"></div>
                <div class="flex">
                    <p class="items-start font-bold text-[24px]">Consultar plan de pagos</p>
                </div>
                <p class='text-md'>Tus pagos se programan cada 15 días comenzando con la fecha del primer pago</p>
                <p class='text-sm'>*Las fechas de pago podrían variar si el día es feriado</p>
                <p class="items-start font-bold text-[18px]">Plan de pagos</p>
                {items.map((e, i) =>
                    <div key={`${i} kueski-quincena`} class={`flex justify-between items-center`}>
                        <div class='flex flex-row gap-2 items-center justify-start'>
                            <div class='flex w-6 justify-center items-center'>
                                <div class={`${e.dotsize} rounded-full items-center justify-center bg-blue-500`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class={`${e.dotsize} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    </svg>
                                </div>
                            </div>
                            <p class={`${i == 0 && 'font-bold'}`}>{e.text1}</p>
                        </div>
                        <p class={`text-md text-zinc-500 ${i == 0 && 'font-bold'}`}>{e.text2}</p>
                    </div>
                )}
                <p class='text-sm'>Al presionar <span class='font-bold'>Pagar</span> acepta las condiciones de la oferta del contrato de crédito que estará disponible inmediatamente en tu cuenta </p>

                <button
                    class="self-center rounded-[50px] w-[320px] h-[52px] mt-3 text-white text-[20px] bg-[#0075ff]"
                    preventdefault:click
              onClick$={() => {
                props.checkoutSubmit(props.checkout.issuer.id);
              }}
              disabled={props.checkout.isLoading}
                >
                    Pagar
                </button>
            </div>
        </div>
    </>
})