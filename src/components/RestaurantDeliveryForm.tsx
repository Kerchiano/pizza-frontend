import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { User } from "../authApi";
import DateSelector from "./DateSelector";
import { useState } from "react";
import TimeSelector from "./TimeSelector";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  OrderItem,
  useAddOrderMutation,
  useGetRestaurantsByCityQuery,
} from "../apiSlice";
import {
  clearCart,
  selectCartItems,
  selectCartToppingItems,
  selectCartTotalPrice,
} from "../cartSlice";
import { format } from "date-fns";
import SelectError from "./SelectError";
import { useNavigate } from "react-router-dom";
import { CircleCheck, X } from "lucide-react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

interface PersonalDataFormProps {
  userDetails: User;
}

const RestaurantDeliveryForm = ({ userDetails }: PersonalDataFormProps) => {
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(citySlug);
  const [selectedDate, setSelectedDate] = useState<string>("Сьогодні");
  const [addOrder] = useAddOrderMutation();
  const cartItems = useSelector(selectCartItems);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch()

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/${citySlug}`);
    dispatch(clearCart());
  };

  const orderItems: OrderItem[] = [];

  cartItems.forEach((product) => {
    orderItems.push({ product: product.id, quantity: product.quantity });
  });

  cartToppingItems.forEach((topping) => {
    orderItems.push({ topping: topping.id, quantity: topping.quantity });
  });

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Ім'я обов'язково"),
    restaurant: Yup.string().required("Виберіть ресторан"),
    delivery_time: Yup.string().required("Виберіть час"),
  });

  const InputWithErrorStyle = ({ name, type, placeholder, disabled }: any) => {
    const [field, meta] = useField(name);
    const isDisabled = name === "phone_number" || name === "first_name" ? true : disabled;

    return (
      <>
        <div className={`form-field ${field.name}-field`}>
          <label className="block text-black text-sm mb-[5px] min-h-[20px]">
            {placeholder}:
          </label>
          <input
            {...field}
            type={type}
            disabled={isDisabled}
            className={`border p-2 rounded w-full ${
              meta.touched && meta.error ? "border-red-500 mb-0" : "mb-4"
            }`}
          />
          {meta.touched && meta.error ? (
            <div className="text-red-500 text-sm">{meta.error}</div>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: userDetails?.first_name || "",
          phone_number: userDetails?.phone_number || "",
          user: userDetails?.id,
          total_amount: cartTotalPrice + 5,
          restaurant: undefined,
          payment_method: "G",
          delivery_date: format(new Date(), "yyyy-MM-dd"),
          delivery_time: "",
          order_items: orderItems,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { first_name, phone_number, ...orderData } = values;
            await addOrder(orderData).unwrap();
            openModal();
          } catch (err: unknown) {
            console.error("Failed to checkout: ", err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleChange }) => (
          <Form className="restaurant-delivery-form">
            <InputWithErrorStyle
              name="first_name"
              type="text"
              placeholder="Ім'я"
            />
            <InputWithErrorStyle
              name="phone_number"
              type="text"
              placeholder="Номер телефону"
              showAddress={true}
            />
            <SelectError
              name="restaurant"
              placeholder="Ресторан"
              options={restaurants.map((restaurant) => ({
                value: restaurant.id,
                label: restaurant.address,
              }))}
            />
            <DateSelector
              setSelectedDate={setSelectedDate}
              handleChange={handleChange}
            />
            <TimeSelector
              selectedDate={selectedDate}
              handleChange={handleChange}
            />
            <div className="form-field">
              <label className="block text-black text-sm mb-[5px] min-h-[20px]">
                Форма оплати:
              </label>
              <select
                onChange={handleChange}
                name="payment_method"
                className="input-with-error-style border cursor-pointer mb-[10px]"
              >
                <option value="G">Готівка</option>
                <option value="Q">Оплата через QR при отримані</option>
              </select>
            </div>
            <div className="wrap-pay-check">
              <div className="order-finalise">
                <div className="order-finalise-row">
                  <div>Сума</div>
                  <div>{cartTotalPrice} грн</div>
                </div>
                <div className="order-finalise-row">
                  <div>Пакет</div>
                  <div>5 грн</div>
                </div>
                <div className="order-finalise-price">
                  <div>До сплати</div>
                  <div>{cartTotalPrice + 5} грн</div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="checkout-btn-restaurant"
                >
                  Оформити замовлення
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        portalClassName="modal-root"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            color: "black",
            padding: "20px",
            margin: "auto",
            width: "500px",
            height: "350px",
            borderRadius: "10px",
          },
        }}
        contentLabel="Успешная регистрация"
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
    </>
  );
};

export default RestaurantDeliveryForm;
