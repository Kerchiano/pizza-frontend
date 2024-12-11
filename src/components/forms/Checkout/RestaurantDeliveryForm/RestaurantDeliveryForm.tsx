import { Formik, Form } from "formik";
import { User } from "../../../../authApi";
import DateSelector from "../../../../pages/Checkout/components/DateSelector";
import { useState } from "react";
import TimeSelector from "../../../../pages/Checkout/components/TimeSelector";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useGetRestaurantsByCityQuery } from "../../../../apiSlice";
import { OrderItem } from "../../../../authApi";
import { useAddOrderMutation } from "../../../../authApi";
import {
  clearCart,
  selectCartItems,
  selectCartToppingItems,
  selectCartTotalPrice,
} from "../../../../cartSlice";
import SelectError from "../../../common/SelectError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validationSchema } from "./validationSchema";
import InputWithErrorStyle from "./InputWithErrorStyle";
import { getInitialValues } from "./getInitialValues";
import OrderSuccessModal from "./OrderSuccessModal";
import PaymentField from "./PaymentField";
import OrderSummary from "./OrderSummary";

interface PersonalDataFormProps {
  userDetails: User;
  isLoading: boolean;
  addressIsLoading: boolean;
}

const RestaurantDeliveryForm = ({
  userDetails,
  isLoading,
  addressIsLoading,
}: PersonalDataFormProps) => {
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(citySlug);
  const [selectedDate, setSelectedDate] = useState<string>("Сьогодні");
  const [addOrder] = useAddOrderMutation();
  const cartItems = useSelector(selectCartItems);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/${citySlug}`);
    dispatch(clearCart());
    document.body.style.overflowY = "auto";
  };

  const orderItems: OrderItem[] = [];

  cartItems.forEach((product) => {
    orderItems.push({ product: product.id, quantity: product.quantity });
  });

  cartToppingItems.forEach((topping) => {
    orderItems.push({ topping: topping.id, quantity: topping.quantity });
  });

  const initialValues = getInitialValues(
    userDetails,
    cartTotalPrice,
    orderItems
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
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
          <>
            {isLoading || addressIsLoading ? (
              <div
                className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
                role="status"
              ></div>
            ) : (
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
                <PaymentField handleChange={handleChange} />
                <OrderSummary
                  cartTotalPrice={cartTotalPrice}
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </>
        )}
      </Formik>
      <OrderSuccessModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default RestaurantDeliveryForm;
