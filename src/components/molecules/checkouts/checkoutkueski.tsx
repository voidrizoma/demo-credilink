import { $, component$ } from "@builder.io/qwik"
import { getExpDate } from "~/helpers/dates";
import { CheckoutModel } from "~/models/checkout-model";
import { Credilink } from "~/models/credilink-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import { getTodaysDateInSpanish } from "~/helpers/dates";


export interface IProps {
    credilink: Credilink;
    checkout: CheckoutModel;
}

export default component$((props: IProps) => {


    // NAVIGATES TO /?loan=<ID>
    const checkoutSubmit = $(async (loanId: string) => {
        props.checkout.isLoading = true;
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
            await fetch(`${baseUrl}coupons`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Important for JSON requests
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
        <div class="min-h-screen bg-white p-4 max-w-2xl mx-auto">
            {props.checkout.isLoading && <ModalLoading />}

            {/* Header */}
            <header class="flex items-center justify-between mb-8">
                <h1 class="text-2xl font-semibold">Detalle de tu compra</h1>
                <button class="text-blue-600 font-medium">Cancelar</button>
            </header>

            {/* Pre-approved Credit */}
            <div class="bg-gray-50 rounded-2xl p-4 mb-8 flex items-center justify-between">
                <div class="flex items-center gap-4">
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
                    strokeWidth="2"
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
                    strokeWidth="2"
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
                            strokeWidth="2"
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
                    checkoutSubmit(props.checkout.issuer.id);
                }}
                disabled={props.checkout.isLoading}
            >
                Comprar
            </button>
        </div>
    )
});

