import { component$, useClientEffect$ } from "@builder.io/qwik";
import Logo from "~/components/atoms/logo";

export default component$(() => {

  useClientEffect$(() => {
    setTimeout(() => {
      window.location.href = "https://www.fluxqr.com/";
    }, 3000);
  });

  return (
    <div class="flex place-content-center w-screen h-screen p-8 text-white bg-gradient-to-r from-[#558cc2] to-[#224c7e]">
      <div class="flex flex-col p-8 gap-8 place-content-center self-center border-2 rounded-md h-[300px] w-[300px]">
        <p class="text-2xl text-center">¡Lo sentimos!</p>
        <div class=" hover:scale-110">
          <Logo
            url={
              "https://firebasestorage.googleapis.com/v0/b/regalinks-7429a.appspot.com/o/logo_flux_blanco.png?alt=media&token=ccc61afe-ad8b-483c-8443-1aa92b491387"
            }
            redirect={"https://www.fluxqr.com/"}
          />
        </div>
      </div>
    </div>
  );
});
