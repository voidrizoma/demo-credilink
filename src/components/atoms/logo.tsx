import { component$ } from "@builder.io/qwik";

export interface IProps {
  url: string;
  redirect?: string;
}

export default component$((props: IProps) => {
  return (
    <div class="flex place-content-center bg-transparent">
      {props?.redirect ? (
        <a
          href={props.redirect}
          target="_blank"
          class="flex place-content-center"
        >
          <img
            class="w-[70%] sm:w-[40%]"
            src={props?.url}
            alt="no image found"
            loading="lazy"
          />
        </a>
      ) : (
          <img
            class="self-center w-[35%] sm:w-[40%]"
            src={props?.url}
            alt="no image found"
            loading="lazy"
          />
      )}
    </div>
  );
});
