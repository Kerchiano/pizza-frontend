import { Formik, Form } from "formik";
import { useAddAddressMutation, User } from "../../../../authApi";
import DateSelector from "../../../../pages/Checkout/components/DateSelector";
import { useState } from "react";
import TimeSelector from "../../../../pages/Checkout/components/TimeSelector";
import { useSelector } from "react-redux";
import {
  clearCart,
  selectCartItems,
  selectCartToppingItems,
  selectCartTotalPrice,
} from "../../../../cartSlice";
import { Address } from "../../../PersonalCabinet/PersonalData/AddressItem";
import { OrderItem } from "../../../../authApi";
import { useAddOrderMutation } from "../../../../authApi";
import SelectError from "../../../common/SelectError";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { useDispatch } from "react-redux";
import { validationSchema } from "./validationSchema";
import InputWithErrorStyle from "./InputWithErrorStyle";
import PaymentField from "./PaymentField";
import OrderSummary from "./OrderSummary";
import SelectFieldCity from "./SelectFieldCity";
import OrderSuccessModal from "./OrderSuccessModal";
import { useAddressUtils } from "./useAddressUtils";
import { handleSubmit } from "./handleSubmit";
import { getInitialValues } from "./getInitialValues";

interface PersonalDataFormProps {
  userDetails: User;
  addresses: Address[];
  isLoading: boolean;
  addressIsLoading: boolean;
}

const CourierDeliveryForm = ({
  userDetails,
  addresses,
  isLoading,
  addressIsLoading,
}: PersonalDataFormProps) => {
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const [selectedDate, setSelectedDate] = useState<string>("Сьогодні");
  const [addAddress] = useAddAddressMutation();
  const [addOrder] = useAddOrderMutation();
  const cartItems = useSelector(selectCartItems);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
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

  const { options, choiceAddress } = useAddressUtils(addresses);

  const initialValues = getInitialValues(
    userDetails,
    addresses,
    cartTotalPrice,
    orderItems
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema(cartTotalPrice)}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit({
            values,
            setSubmitting,
            addresses,
            userDetails,
            openModal,
            addAddress,
            addOrder,
          })
        }
      >
        {({ setFieldValue, handleChange, isSubmitting, values }) => (
          <>
            {isLoading || addressIsLoading ? (
              <div
                className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
                role="status"
              ></div>
            ) : (
              <Form className="courier-delivery-form">
                <InputWithErrorStyle
                  name="first_name"
                  type="text"
                  placeholder="Ім'я:"
                />
                <InputWithErrorStyle
                  name="phone_number"
                  type="text"
                  placeholder="Номер телефону:"
                />
                <div className="estetic-line"></div>
                <SelectError
                  name="delivery_address"
                  placeholder="Адрес"
                  options={options}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedAddressId = Number(e.target.value);
                    choiceAddress(selectedAddressId, setFieldValue);
                    setFieldValue("delivery_address", selectedAddressId);
                  }}
                />
                <div className="delivery-address">
                  <div className="exist-or-new-address">
                    <SelectFieldCity
                      handleChange={handleChange}
                      city={values.city}
                    />
                    <InputWithErrorStyle
                      placeholder="Вулиця:"
                      name="street"
                      type="text"
                    />
                    <InputWithErrorStyle
                      placeholder="Будинок:"
                      name="house_number"
                      type="text"
                    />
                    <InputWithErrorStyle
                      placeholder="Під'їзд:"
                      name="floor"
                      type="text"
                    />
                    <InputWithErrorStyle
                      placeholder="Этаж:"
                      name="entrance"
                      type="text"
                    />
                    <InputWithErrorStyle
                      placeholder="Квартира:"
                      name="flat"
                      type="text"
                    />
                  </div>
                </div>
                <DateSelector
                  handleChange={handleChange}
                  setSelectedDate={setSelectedDate}
                />
                <TimeSelector
                  selectedDate={selectedDate}
                  handleChange={handleChange}
                />
                <PaymentField handleChange={handleChange} />
                {values.payment_method !== "C" && (
                  <InputWithErrorStyle
                    placeholder="Підготувати решту з:"
                    name="paid_amount"
                    type="text"
                  />
                )}
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

export default CourierDeliveryForm;
