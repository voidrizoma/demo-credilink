import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Credilink from "./credilink";

export default component$(() => {
  const loc = useLocation();

  return (
    <div>
      {/* <p>pathname: {loc.pathname}</p>
      <p>NAME: {loc.params.name}</p> */}
      {loc.params.slug?.length ? (
        <Credilink slug={loc.params.slug} />
      ) : (
        <div>Credilink NO ENCONTRADO</div>
      )}
    </div>
  );
});
