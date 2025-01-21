interface IProps {
  id?: string;
  text: string;
  url?: string;
  margin?: string;
  padding?: string;
  position?: string;
  color?: string;
  size?: string;
  weight?: string;
}

export const Text = (props: IProps) => {
  return (
    <>
      {!props.url ? (
        <p
          id={`${props.id?.length ? props.id : ""}`}
          class={`flex ${props.position ? props.position : "place-content-center"
            } ${props.margin ? props.margin : "m-0"} ${props.padding ? props.padding : "p-0"
            } ${props.color ? props.color : ""} ${props.size ?? props.size} ${props.weight ? props.weight : ""
            }`}
        >
          {props.text}
        </p>
      ) : (
        <a
          id={`${props.id?.length ? props.id : ""}`}
          href={props.url}
          target="_blank"
          class={`flex underline underline-offset-1
          ${props.position ? props.position : "place-content-center"}  
          ${props.margin ? props.margin : "m-0"}
          ${props.padding ? props.padding : "p-0"}
          ${props.color ?? props.color} ${props.size ?? props.size}
          ${props.weight ?? props.weight}`}
        >
          {props.text}
        </a>
      )}
    </>
  );
};
