import { component$, $, useStore, useSignal, useTask$ } from "@builder.io/qwik";
import { Credilink } from "~/models/credilink-model";
import { CheckoutModel } from "~/models/checkout-model";
import { envVars } from "~/models/global-vars";
import { ModalLoading } from "../modalLoading";
import mp1 from "../../../assets/checkout/mp1.png";
import mp2 from "../../../assets/checkout/mp2.png";
import mp22 from "../../../assets/checkout/mp22.png";
import mp23 from "../../../assets/checkout/mp23.png";
import mp3 from "../../../assets/checkout/mp3.png";
import CustomText from "~/components/atoms/customText";
import Header from "~/components/template/header"
import Footer from "~/components/template/footer"
import { Text } from "~/components/atoms/text"
import { modelStylesData } from "~/models/modelStyles";
import logoWhite from "../../../assets/flux_blanco.png"
import Qr from "~/components/atoms/qr"
import MPLoan from "../../../assets/loan/mercadopago_small.png"

export interface IProps {
  credilink: Credilink;
  checkout: CheckoutModel;
}

export default component$((props: IProps) => {
  const fees = [
    { factor: 1.0763, cuotes: 1 },
    { factor: 1.1422, cuotes: 3 },
    { factor: 1.2466, cuotes: 6 },
    { factor: 1.356033333, cuotes: 9 },
    { factor: 1.471433333, cuotes: 12 },
  ];
  // NAVIGATES TO /?loan=<ID>
  const state = useStore({
    currentOption: "",
    isLoading: false,
  });
  const showQR = useSignal(false); // Inicializamos en false, se mostrará al completar
  const qrData = useStore<any>({});
  const formattedExpirationDisplay = useSignal('');

  const formatDate = $((isoDate: string) => {
      const date = new Date(isoDate);
      return date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    })


    useTask$(async ({ track }) => {
      track(() => qrData.expiration); // Rastrea la propiedad expiration del store
  
      if (qrData.expiration) {
        // Llama a la QRL formatDate y await su resultado
        formattedExpirationDisplay.value = await formatDate(qrData.expiration);
      } else {
        formattedExpirationDisplay.value = ''; // Limpiar si no hay fecha
      }
    });

    const checkoutSubmit = $(async () => {
      props.checkout.isLoading = true;
    
      try {
        console.log("refreshToken original:", envVars.refreshToken);
    
        const tokenRes = await fetch('/api/token', {
          method: 'POST',
        });
        const tokenJson = await tokenRes.json();
        console.log("Respuesta de refreshToken:", tokenJson.data.accessToken);
    
        if (!tokenJson?.data.accessToken) {
          throw new Error("No se obtuvo el token desde el refreshToken");
        }
    
        const validToken = tokenJson.data.accessToken;
    
        // 2️⃣ Armar datos del cupón
        const expirationDate = new Date();
        expirationDate.setHours(23, 59, 59, 999);
        const expirationApiFormat = expirationDate.toISOString();
    
        const dataCoupon = {
          commerce: "188e2df4-b923-4398-9b81-812866ec08a1",
          amount: Math.round(Number(props.checkout.userData.amount) * 100),
          expiration: expirationApiFormat,
          isPayable: false,
          customer: {
            name: "Usuario de prueba",
            email: props.checkout.userData.email,
          },
        };
    
        console.log("Payload para /giftcards:", dataCoupon);
        console.log("Token válido a usar:", validToken);
    
        // 3️⃣ Usar proxy en backend para evitar CORS: llamar a /api/giftcards
        const res = await fetch('/api/giftcards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: validToken,
            dataCoupon: dataCoupon,
          }),
        });
    
        console.log("Status code giftcards:", res.status);
        console.log("Headers giftcards:", Object.fromEntries(res.headers.entries()));
    
        const data = await res.json();
        console.log("Respuesta body giftcards:", data);
    
        const response = data.data;
    
        if (response?.id?.length) {
          qrData.id = response.id;
          qrData.qr = response.qr;
          qrData.amount = response.amount;
          qrData.title = "Mercado Pago";
          qrData.expiration = response.expiration;
          qrData.commerce = response.commerce;
          qrData.customer = response.customer;
          qrData.enabled = response.enabled;
          qrData.isPayable = response.isPayable;
          showQR.value = true;
    
          try {
            const formattedExpirationForZapier = await formatDate(qrData.expiration);
            const zapierData = {
              tel: `+52${props.checkout.userData.phone}`,
              id: qrData.id,
              imgUrl: `https://qr.fluxqr.net/?text=${encodeURIComponent(qrData.qr)}`,
              amount: `$${parseFloat(qrData.amount) / 100}`,
              commerce: "Flux QR",
              expiration: formattedExpirationForZapier,
              qr: qrData.qr,
            };
            console.log("Datos enviados a Zapier:", zapierData);
    
            const zapierRes = await fetch(envVars.urlZapier, {
              method: "POST",
              body: JSON.stringify(zapierData),
            });
    
            console.log("Respuesta Zapier:", await zapierRes.text());
          } catch (e) {
            console.error("Error al enviar a Zapier:", e);
          }
        } else {
          console.error("No se recibió un ID válido de la API de giftcards.");
        }
    
      } catch (err) {
        console.error("Error en checkoutSubmit:", err);
      } finally {
        props.checkout.isLoading = false;
      }
    });
    
  return (
    <>
      {state.isLoading && <ModalLoading />}
      {!showQR.value && (
        <div class="flex flex-col rounded max-w-[500px]">
          <img src={mp1} alt="mp-top-image-logo" />
          <div class="flex flex-row justify-between place-content-center px-8 py-1">
            <CustomText
              text={props.credilink.commerceName}
              color="#646464"
              size="18px"
            />
            <CustomText
              text={`$${parseFloat(props.checkout.userData.amount).toFixed(2)}`}
              color="#646464"
              size="18px"
            />
          </div>
          <div class="bg-[#f0f0f0] px-6 py-3">
            <div class="flex justify-center">
              <img class="max-w-[280px]" src={mp2} alt="mp-middle-image-logo" />
            </div>
            <div class="py-2 bg-white rounded-[5px]">
              <img src={mp22} alt="mp22-image" />
              <div class="flex items-center">
                <div class="flex justify-center items-center mx-2 w-[54px] h-[54px] rounded-[50px] border-[#c2c0c0] border-[1px]">
                  <p class="text-[18px] text-[#02b1e9] font-bold p-0 m-0">
                    {!state.currentOption?.length
                      ? "1x"
                      : state.currentOption.slice(0, 3)}
                  </p>
                </div>
                <div class="flex flex-col py-1 px-4">
                  <p class="text-[18px] text-[#444444]">Meses</p>
                  <select
                    onChange$={(e: any) => {
                      console.log(e.target.value);
                      state.currentOption = e.target.value;
                    }}
                    class="mb-2 px-2 max-w-[400px] min-h-[60px] text-[#646464] border-gray-200 border-[2px] rounded-[5px]"
                  >
                    {fees.map((e, idx) => (
                      <option key={e.cuotes + idx}>{`${e.cuotes}x $ ${(
                        (e.factor * parseFloat(props.checkout.userData.amount)) /
                        e.cuotes
                      ).toFixed(2)} ($ ${(
                        e.factor * parseFloat(props.checkout.userData.amount)
                      ).toFixed(2)})`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* QUOTES */}
            <div class="flex flex-col items-center text-[20px] font-semibold pt-3">
              <div class="max-w-[350px]">
                <img src={mp23} alt="mp23-image-logo" />
              </div>
              <button
                class="text-white rounded-[5px] border-none h-[40px] w-full bg-[#02b1e9]"
                preventdefault:click
                onClick$={() => {
                  checkoutSubmit();
                }}
                disabled={state.isLoading}
              >
                Pagar
              </button>
              <div class="max-w-[120px]">
                <img src={mp3} alt="mp3-image" />
              </div>
            </div>
          </div>
        </div>
      )}{showQR.value && (
        <div class={`flex h-screen w-screen flex-col place-content-center text-white sc600:w-[600px] ${modelStylesData.bgColor.gradient}`}>
          <div class="flex flex-col h-full w-full text-center text-white">
            <Header imgSrc={logoWhite} />
            <div class='flex flex-col gap-1 md:gap-4 h-full items-center'>
              <div class='h-[30px]'></div>
              <img src={MPLoan} alt={MPLoan} width={150} height={50} />
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
                text={`Expira el ${formattedExpirationDisplay.value}`}
                size={modelStylesData.textSize.subtitle}
                weight={modelStylesData.textWeight.normal}
              />
            </div>
            <Footer isSlug={false} textBoxState={null} issuerNames={[""]} />
          </div>
        </div>
      )}
    </>
  );
});
