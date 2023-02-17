import { Modal } from "~/components/atoms/modal";
import loader from "../../images/loader.gif"

export const ModalLoading = () => {
    return (
        <Modal>
            <img
                class="flex m-2 rounded-[20px]"
                src={loader}
                alt=""
            />
        </Modal>
    );
};
