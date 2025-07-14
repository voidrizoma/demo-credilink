/* eslint-disable qwik/valid-lexical-scope */
import { component$, useStore } from "@builder.io/qwik";
import { issuerFinder } from "~/helpers/issuer-methods";
import { Issuer } from "~/models/issuer-model";
import { StoreData } from "~/models/store-data-model";
import { Text } from "./text";
import { Validation, isValidAmount, isValidPhone } from "~/helpers/validation";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";

export interface IProps {
  issuers: Issuer[];
  store: StoreData;
  validationStore: Validation;
  credilink: Credilink;
  checkout: CheckoutModel;
  submitData: () => void;
}

// Función helper para obtener colores de fondo según el issuer usando los colores exactos
const getIssuerBgColor = (issuerName: string): string => {
  const name = issuerName.toLowerCase();
  if (name.includes('kueski')) return '#efefef';
  if (name.includes('aplazo')) return '#64e9f7';
  if (name.includes('mp')) return '#FFE600';
  if (name.includes('coppel')) return '#1568B3';
  if (name.includes('creditea')) return '#10465b';
  return '#6b7280'; // color por defecto (gray-500)
};

// Función helper para obtener descripciones según el issuer
const getIssuerDescription = (issuerName: string): string => {
  const name = issuerName.toLowerCase();
  if (name.includes('kueski')) return 'De 5 a 12 quincenas sin anticipo, sin tarjeta';
  if (name.includes('aplazo')) return 'Paga en 5 quincenas con un cargo a tu tarjeta';
  if (name.includes('mp')) return 'Paga hasta en 12 meses con Mercado Crédito';
  if (name.includes('coppel')) return 'Hasta 12 meses con tu crédito Coppel';
  if (name.includes('creditea')) return '¡Compra hoy y paga en 2 quincenas sin intereses!';
  return 'Opción de pago disponible';
};


export default component$((props: IProps) => {
  const selected = useStore({ index: -1 });

  return (
    <div class="flex flex-col  sc600:w-[600px] my-8">
      <Text
        text="Selecciona una opción:"
        color="text-white"
        weight="font-bold"
        size="text-lg sm:text-xl md:text-2xl lg:text-3xl"
      />
      <div class="flex place-content-center">
        <input
          id="auxInput"
          class={`z-[-1] h-1 w-1 self-center justify-self-center bg-transparent`}
          style={{ color: props.credilink.colorPrimary }}
          type="text"
          placeholder="."
          onFocus$={() => {
            const auxInput = document.getElementById("auxInput");
            auxInput?.blur();
          }}
        />
      </div>

      <div
        id="flux-issuers"
        class="grid grid-cols-2 justify-items-center gap-3 sm:gap-4 my-2 mx-2 md:m-8"
        style={{
          gridTemplateRows: `repeat(auto-fill, minmax(120px, 1fr))`,
        }}
      >
        {props.issuers.map((el: Issuer, elIndex) => (
          <button
            key={`issuer-btn-${el.name}-${elIndex}`}
            id={`issuer-btn-${el.name}-${elIndex}`}
            class={`
              group relative overflow-hidden rounded-lg transition-all duration-200 w-full h-full
              hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400
              ${elIndex === selected.index
                ? "ring-2 ring-yellow-400 scale-105"
                : ""
              }
            `}
            disabled={elIndex === selected.index}
            style={{
              gridColumn:
                props.issuers.length % 2 === 1 && // si cantidad impar
                  elIndex === props.issuers.length - 1
                  ? "1 / span 2" // último botón ocupa 2 columnas (centrado)
                  : "auto",
              minHeight: "120px",
              // En mobile y pantallas pequeñas, limitar el ancho del último elemento
              maxWidth: props.issuers.length % 2 === 1 && elIndex === props.issuers.length - 1 
                ? "calc(50% - 0.375rem)" // Mismo ancho que los otros botones en mobile (50% menos la mitad del gap)
                : "100%",
              // Centrar el último elemento cuando está solo
              marginLeft: props.issuers.length % 2 === 1 && elIndex === props.issuers.length - 1 
                ? "auto"
                : "0",
              marginRight: props.issuers.length % 2 === 1 && elIndex === props.issuers.length - 1 
                ? "auto"
                : "0"
            }}
            onClick$={() => {
              if (props.store.phone?.length > 0 && props.store.amount?.length > 0) {
                props.validationStore.validPhone = isValidPhone(props.store.phone);
                props.validationStore.validAmount = isValidAmount(
                  props.credilink.min,
                  props.credilink.max,
                  props.store.amount
                );
                if (props.validationStore.validAmount && props.validationStore.validPhone) {
                  selected.index = elIndex;

                  props.store.issuer = el; // ✅ <--- ESTA LÍNEA ES CLAVE
                  props.checkout.issuer = el;
                  props.checkout.userData = {
                    email: envVars.fixedEmail,
                    amount: props.store.amount,
                    phone: props.store.phone,
                  };

                  props.submitData();
                }
              } else {
                props.validationStore.validEmail = false;
                props.validationStore.validAmount = false;
                props.validationStore.validPhone = false;
              }
            }}
          >
            {/* Logo Section - Colored Header con colores exactos */}
            <div 
              class="p-2 sm:p-3 flex items-center justify-center h-1/2"
              style={{ backgroundColor: getIssuerBgColor(el.name) }}
            >
              <img
                id={`issuer-btn-img-${issuerFinder(el.name)?.name}`}
                key={`issuer-btn-img-${issuerFinder(el.name)?.name}`}
                class="object-contain select-none"
                src={issuerFinder(el.name)?.img || "/placeholder.svg"}
                alt="issuer-logo-image"
                draggable={false}
                height={10}
                width={100}
              />
            </div>

            {/* Description Section - Dark Bottom */}
            <div class="bg-slate-500 p-2 sm:p-3 text-center h-1/2 flex items-center justify-center">
              <p class="text-white text-xs sm:text-sm font-medium leading-tight">
                {getIssuerDescription(el.name)}
              </p>
            </div>

            {/* Selection Indicator */}
            {elIndex === selected.index && (
              <div class="absolute inset-0 bg-yellow-400/20 pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
});