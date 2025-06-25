import { $, component$, useStore } from '@builder.io/qwik'
import aplazoLogo from '../../../assets/aplazo.svg'
import mc from '../../../assets/Mastercard-logo.png'
import codi from '../../../assets/codi.png'
import { modelStylesData } from '~/models/modelStyles'
import { Credilink } from '~/models/credilink-model'
import { CheckoutModel } from '~/models/checkout-model'
import { envVars } from '~/models/global-vars'
import { getExpDate } from '~/helpers/dates'

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

    const checkoutSubmit = $(async (loanId: string) => {
        state.isLoading = true;
        // const expiresIn = new Date();
        // expiresIn.setHours(23, 59, 59, 0).toLocaleString();

        try {
            const baseUrl = envVars.apiUrlFlux;
            const dataCoupon = {
                commerce: props.credilink.commerce,
                amount: Math.round(Number(props.checkout.userData.amount) * 100),
                expiration: `${getExpDate()}T05:59:59.999Z`,
                // expiration: "2023-12-12T05:59:59.999Z",
                isPayable: false,
                customer: {
                    name: "Usuario de prueba",
                    email: props.checkout.userData.email,
                },
            };
            await fetch(`${baseUrl}/giftcards`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${envVars.refreshToken}`,// Important for JSON requests
                },
                body: JSON.stringify(dataCoupon),
            }).then(async (res) => {
                const data = await res.json();
                console.log("DATA :::::::::: ", data)
                if (data?.id?.length) {
                    console.log(data.id)
                    window.location.href = `/?loan=${data.id}`;
                    try {
                        const zapierData = {
                            tel: `+52${props.checkout.userData.phone}`,
                            id: data.id,
                            imgUrl: `https://qr.fluxqr.net/?text=${encodeURIComponent(
                                data.qr
                            )}`,
                            amount: `$${parseFloat(data.amount) / 100}`,
                            commerce: props.credilink.commerceName,
                            expiration: data.expiration,
                            qr: data.qr,
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
                            window.location.href = `/?loan=${data.id}`;
                        }
                    } catch (e) {
                        console.log("error", e);
                    }
                    window.location.href = `/?loan=${data.id}`;
                } else {
                    window.location.href = `/?loan=${loanId}`;
                }
            });
        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            props.checkout.isLoading = true;
            return;
        }, 3000);
    });


    return (
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
                    checkoutSubmit(props.checkout.issuer.id);
                }}
                disabled={state.isLoading}
            >
                CONFIRMAR PAGO
            </button>
        </div>
    )
})