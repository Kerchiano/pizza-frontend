import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { CircleCheck, MessageSquareText, Phone, X } from "lucide-react";
import Modal from "react-modal";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const ContactList = () => {
  const data = [
    {
      telNumber: "(093 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/life.png",
    },
    {
      telNumber: "(067 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/kiyvstar.png",
    },
    {
      telNumber: "(099 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/vodafon.png",
    },
  ];
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSuccessIsOpen, setModalSuccessIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openReviewModal = () => {
    setFalse();
    setModalIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
    document.body.style.overflowY = "hidden";
  };
  const closeReviewModal = () => {
    setIsAnimating(false);
    setTimeout(() => setModalIsOpen(false), 300);
    document.body.style.overflowY = "auto";
  };

  const openModal = () => {
    setModalSuccessIsOpen(true);
    setTimeout(() => setIsAnimating(true), 300);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setModalSuccessIsOpen(false), 300);
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      <div
        ref={dropListRef}
        className="ml-3 relative mr-4 text-base sm:ml-8 lg:ml-4"
      >
        <span onClick={toggle} className="drop-list-triangle cursor-pointer">
          <span className="duration-base-transition text-white font-medium hidden lg:block">
            Контакти
          </span>
          <Phone className="block lg:hidden" color="white" />
        </span>
        {isToggled && (
          <div
            style={{ padding: "20px" }}
            className="drop-list-content contacts"
          >
            <div className="drop-list-content-scroll">
              <div className="text-lg text-zinc-600 font-semibold">
                Служба доставки
              </div>
              <ul>
                {data.map((item, index) => (
                  <li className="mt-4 mb-4" key={index}>
                    <span
                      style={{
                        background: `url(${item.img}) left center no-repeat`,
                      }}
                      onClick={() => {
                        setFalse();
                      }}
                      className={` text-zinc-600 font-medium pointer-events-auto inline-block h-6 pl-9 whitespace-nowrap cursor-pointer`}
                    >
                      {item.telNumber}
                    </span>
                  </li>
                ))}
              </ul>
              <div>
                <div onClick={openReviewModal} className="review">
                  <MessageSquareText className="message-icon" color="white" />
                  Написати відгук
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeReviewModal}
        portalClassName="modal-review-form-root"
        className="modal-review-content"
        overlayClassName="modal-review-overlay"
        style={{
          overlay: {
            opacity: isAnimating ? 1 : 0,
          },
        }}
        contentLabel="Відгук"
      >
        <div className="flex flex-col justify-center items-center relative">
          <X
            size={30}
            className="absolute -right-[10px] -top-[10px] text-gray-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={closeReviewModal}
          >
            Закрыть
          </X>
          <div className="popup-body">
            <div className="title">Зворотній зв'язок</div>
            <ReviewForm
              closeReviewForm={closeReviewModal}
              openModal={openModal}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalSuccessIsOpen}
        onRequestClose={closeModal}
        portalClassName="modal-review-success-root"
        className="modal-review-success-content"
        overlayClassName="modal-review-success-overlay"
        style={{
          overlay: {
            opacity: isAnimating ? 1 : 0,
          },
        }}
        contentLabel="Успішний відгук"
      >
        <div className="flex flex-col justify-center items-center relative">
          <h2 className="mb-5 mt-10">Відгук успішний!</h2>
          <p className="mb-8">Ваш відгук був успішно відправлений!</p>
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
    </>
  );
};

export default ContactList;
