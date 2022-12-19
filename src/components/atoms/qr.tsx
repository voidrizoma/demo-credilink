import { component$ } from '@builder.io/qwik';

export interface IProps {
    url?: string;
}

export default component$((props: IProps) => {
  return (
    <div class="flex place-content-center bg-transparent pt-[5%]">
      <img src={props?.url} alt='no image found' loading='lazy'/>
    </div>
  );
});
