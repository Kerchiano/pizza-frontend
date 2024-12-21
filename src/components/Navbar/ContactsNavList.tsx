import useToggle from "../hooks/useToggle";
import useClickOutside from "../hooks/useClickOutside";
import { CircleCheck, MessageSquareText, Phone, X } from "lucide-react";
import Modal from "react-modal";
import { useState } from "react";
import ReviewForm from "../forms/ReviewForm/ReviewForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../authSlice";
import {
  closeReviewModal,
  openReviewModal,
  selectIsAnimating,
  selectReviewModal,
  setAnimating,
} from "../../modalSlice";
import { useDispatch } from "react-redux";

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
  const [modalSuccessIsOpen, setModalSuccessIsOpen] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);
  const isAnimating = useSelector(selectIsAnimating)
  const redirectPath = location.pathname;
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const reviewModal = useSelector(selectReviewModal);

  const openReview = () => {
    setFalse();
    dispatch(openReviewModal());
    setTimeout(() => dispatch(setAnimating(true)), 10);
    document.body.style.overflowY = "hidden";
  };

  const closeReview = () => {
    dispatch(setAnimating(false));
    setTimeout(() => {
      dispatch(closeReviewModal());
      document.body.style.overflowY = "auto";
    }, 300);
  };

  const openModal = () => {
    setModalSuccessIsOpen(true);
    setTimeout(() => dispatch(setAnimating(true)), 300);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    dispatch(setAnimating(false));
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
                <div onClick={openReview} className="review">
                  <MessageSquareText className="message-icon" color="white" />
                  Написати відгук
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={reviewModal}
        onRequestClose={closeReview}
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
            onClick={closeReview}
          >
            Закрыть
          </X>
          {isAuthenticated ? (
            <div className="popup-body">
              <div className="title">Зворотній зв'язок</div>
              <ReviewForm closeReviewForm={closeReview} openModal={openModal} />
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">
                  Щоб залишити відгук потрібно авторизуватися
                </h2>
              </div>
              <div className="checkout-auth">
                <div className="checkout-auth-container">
                  <div className="w-full text-center">
                    <Link
                      onClick={closeReview}
                      to={`/login?redirect=${redirectPath}&modal=true`}
                      className="text-black text-[30px] font-medium leading-[40px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-black after:scale-x-0 hover:after:scale-x-100 transition-transform"
                    >
                      Вхід
                    </Link>
                    <span className="text-[30px] text-black text-center leading-[40px] font-medium ml-2 mr-2">
                      /
                    </span>
                    <Link
                      onClick={closeReview}
                      to={`/registration?redirect=${redirectPath}&modal=true`}
                      className="text-black text-[30px] font-medium leading-[40px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-black after:scale-x-0 hover:after:scale-x-100 transition-transform"
                    >
                      Реєстрація
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
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
