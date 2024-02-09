import { Modal } from "~/components/atoms/modal";
// import loader from "../../images/loader.gif";
import { modelStylesData } from "~/models/modelStyles";

export const ModalLoading = () => {
  return (
    <Modal>
      {/* <img
                class="flex m-2 rounded-[20px]"
                src={loader}
                alt=""
            /> */}
      <div
        class={`m-3 flex items-center justify-center rounded-[100px] border-2 border-none ${modelStylesData.bgColor.fluxIndigo2} p-4`}
      >
        <div class="flex items-center justify-center">
          <div
            class="inline-block  h-[50px] w-[50px] sc300:h-[70px] sc300:w-[70px] sc500:h-[100px] sc500:w-[100px] animate-spin rounded-full border-[2px] sc300:border-[3px] sc400:border-[4px] border-current border-t-transparent text-white dark:text-white"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
