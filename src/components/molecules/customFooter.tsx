import { component$ } from "@builder.io/qwik";
import LinkText from "../atoms/linkText";
import logoflux from "../../assets/flux_blanco.png"

export interface IProps {
  bgColor: string;
  logoCommerce?: string;
}

export default component$((props: IProps) => {
  return (
    <div
      class="flex justify-between items-center p-4"
      style={{ background: props.bgColor }}
    >
      <img
        class="h-[30px] md:h-[40px]"
        src={logoflux}
        alt="logo"
      />
      {props.logoCommerce ? (
        <img class="h-[15px] md:h-[20px]" src={props.logoCommerce} alt="" />
      ) : (
        <div class="flex place-content-center flex-col">
          <LinkText
            text="©Copyright. 2022 Flux QR. Todos los derechos reservados"
            url="https://fluxqr.com/politica-de-privacidad/"
          />
          <LinkText
            text="Aviso de privacidad"
            url="https://fluxqr.com/politica-de-privacidad/"
          />
        </div>
      )}
    </div>
  );
});
