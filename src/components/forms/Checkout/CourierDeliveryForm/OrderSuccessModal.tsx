import Modal from "react-modal";
import { X, CircleCheck } from "lucide-react";

interface OrderSuccessModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const OrderSuccessModal = ({
  modalIsOpen,
  closeModal,
}: OrderSuccessModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      portalClassName="modal-root"
      className="modal-order-content"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      contentLabel="Успішне замовлення"
    >
      <div className="flex flex-col justify-center items-center relative">
        <h2 className="mb-5 mt-10">Оформлення замовлення успішно!</h2>
        <p className="mb-8">Ваше замовлення було успішно створено!</p>
        <X
          size={30}
          className="absolute -right-[10px] -top-[10px] text-gray-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
          onClick={closeModal}
        >
          Закрыть
        </X>
        <CircleCheck className="text-green-500" size={88} />
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
