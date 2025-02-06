import { component$ } from "@builder.io/qwik";
import Logo from "~/components/atoms/logo";
import logoflux from "../../assets/flux_blanco.png"

export default component$(() => {

  // useClientEffect$(() => {
  //   setTimeout(() => {
  //     // window.location.href = "https://www.fluxqr.com/";
  //   }, 1500);
  // });

  return (
    <div class="flex place-content-center w-screen h-screen p-8 text-white bg-gradient-to-r from-[#558cc2] to-[#224c7e]">
      <div class="flex flex-col p-8 gap-8 place-content-center self-center border-2 rounded-md h-[300px] w-[300px]">
        <p class="text-2xl text-center">¡Lo sentimos!</p>
        <div class=" hover:scale-110">
          <Logo
            url={logoflux}
            redirect={"https://www.fluxqr.com/"}
          />
        </div>
      </div>
    </div>
  );
});
