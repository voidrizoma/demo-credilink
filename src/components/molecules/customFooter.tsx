import { component$ } from "@builder.io/qwik";
import LinkText from "../atoms/linkText";

export interface IProps {
  bgColor: string;
  logoCommerce?: string;
}

export default component$((props: IProps) => {
  return (
    <div
      class="flex justify-between place-content-center p-4"
      style={{ background: props.bgColor }}
    >
      <img
        class="h-[30px] md:h-[40px]"
        src="https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
        alt="logo"
      />
      {props.logoCommerce ? (
        <img class="h-[30px] md:h-[40px] bg-white-400" src={props.logoCommerce} alt="" />
      ) : (
        <div class="flex place-content-center flex-col">
          <LinkText
            text="Terminos y condiciones"
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
