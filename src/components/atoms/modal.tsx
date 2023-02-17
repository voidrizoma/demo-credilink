import { Slot, component$ } from '@builder.io/qwik';

export const Modal = component$(() => {
    return (
        <div class="flex place-content-center bg-zinc-200 opacity-90 fixed inset-0 z-50">
            <div class="flex items-center h-screen">
                <div
                    class={`flex m-3 p-4 justify-center items-center rounded-[20px] bg-white min-w-[200px] max-w-[300px] max-h-[300px]`}
                >
                    <div class="flex flex-col justify-center items-center">
                        <Slot />
                    </div>
                </div>
            </div>
        </div>
    );
});
