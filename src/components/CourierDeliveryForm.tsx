import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useAddAddressMutation, User } from "../authApi";
import DateSelector from "./DateSelector";
import { useState } from "react";
import TimeSelector from "./TimeSelector";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import {
  clearCart,
  selectCartItems,
  selectCartToppingItems,
  selectCartTotalPrice,
} from "../cartSlice";
import { Address } from "./AddressItem";
import { OrderItem } from "../authApi";
import { useAddOrderMutation } from "../authApi";
import SelectError from "./SelectError";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CircleCheck, X } from "lucide-react";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

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

  const CITY_CHOICES: { [key: string]: string } = {
    K: "Київ",
    Kh: "Харків",
    D: "Дніпро",
    M: "Миколаїв",
  };

  const options = addresses.map((address: any) => ({
    value: address.id,
    label: `м.${CITY_CHOICES[address.city]} вул.${address.street} буд.${
      address.house_number
    } під'їзд ${address.floor} этаж ${address.entrance} кв.${address.flat}`,
  }));

  const choiceAddress = (addressId: number, setFieldValue: Function) => {
    const foundAddress = addresses.find((address) => address.id === addressId);
    if (foundAddress) {
      setFieldValue("city", foundAddress.city);
      setFieldValue("street", foundAddress.street);
      setFieldValue("house_number", foundAddress.house_number);
      setFieldValue("floor", foundAddress.floor);
      setFieldValue("entrance", foundAddress.entrance);
      setFieldValue("flat", foundAddress.flat);
    }
  };

  const validationSchema = Yup.object({
    delivery_address: Yup.string().test(
      "delivery-address-required",
      "Виберіть адрес або якщо його нема то введіть нижче адресу",
      function (value) {
        const { street, house_number, floor } = this.parent;
        if (value && value !== "0") {
          return true;
        }
        return street && house_number && floor;
      }
    ),
    delivery_time: Yup.string().required("Виберіть час"),
    street: Yup.string().required("Вулиця обов'язково"),
    house_number: Yup.string().required("Будинок обов'язково"),
    floor: Yup.string().required("Під'їзд обов'язково"),
    paid_amount: Yup.number()
      .nullable()
      .transform((value, originalValue) => {
        if (originalValue === "") return null;
        return isNaN(originalValue) ? NaN : value;
      })
      .typeError("Введіть число")
      .test(
        "is-greater-than-cartTotalPrice",
        `Недостатньо. Мінімальна сума: ${cartTotalPrice + 59 + 5}`,
        (value) =>
          value == null ||
          (typeof value === "number" && value > cartTotalPrice + 59)
      ),
  });

  const InputWithErrorStyle = ({ name, type, placeholder, disabled }: any) => {
    const [field, meta] = useField(name);
    const isDisabled =
      name === "phone_number" || name === "first_name" ? true : disabled;

    return (
      <>
        <div className={`form-field ${field.name}-field`}>
          <label className="block text-black text-sm mb-[5px] min-h-[20px]">
            {placeholder}
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
          total_amount: cartTotalPrice + 59 + 5,
          paid_amount: "",
          delivery_address: addresses[0]?.id || undefined,
          payment_method: "G",
          city: addresses[0]?.city || "K",
          street: addresses[0]?.street || "",
          house_number: addresses[0]?.house_number || "",
          floor: addresses[0]?.floor || "",
          entrance: addresses[0]?.entrance || "",
          flat: addresses[0]?.flat || "",
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
            const {
              first_name,
              phone_number,
              total_amount,
              paid_amount,
              delivery_address,
              delivery_date,
              delivery_time,
              payment_method,
              order_items,
              ...addressData
            } = values;

            let newAddressId = delivery_address;

            const selectedAddress = addresses.find(
              (address) => address.id === delivery_address
            );
            const isAddressChanged = selectedAddress
              ? (Object.keys(addressData) as (keyof typeof addressData)[])
                  .filter((key) => key !== "user")
                  .some(
                    (key) =>
                      addressData[key] !== selectedAddress[key as keyof Address]
                  )
              : true;

            if (isAddressChanged) {
              const newAddress = {
                ...addressData,
                user: userDetails.id,
              };
              const createdAddress = await addAddress(newAddress).unwrap();
              newAddressId = createdAddress.id;
            }

            const orderData = {
              total_amount,
              paid_amount: paid_amount === "" ? 0 : paid_amount,
              delivery_address: newAddressId,
              delivery_date,
              delivery_time,
              payment_method,
              order_items,
              user: userDetails.id,
            };

            await addOrder(orderData).unwrap();
            openModal();
          } catch (err: unknown) {
            console.error("Failed to checkout: ", err);
          } finally {
            setSubmitting(false);
          }
        }}
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
                  showAddress={true}
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
                    <div className="form-field city-field">
                      <label className="block text-black text-sm mb-[5px]">
                        Місто
                      </label>
                      <select
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        className="input-with-error-style border cursor-pointer"
                      >
                        <option value="К">Київ</option>
                        <option value="Kh">Харків</option>
                        <option value="D">Дніпро</option>
                        <option value="M">Миколаїв</option>
                      </select>
                    </div>
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
                <div className="form-field">
                  <label className="block text-black text-sm mb-[5px] min-h-[20px]">
                    Форма оплати:
                  </label>
                  <select
                    name="payment_method"
                    className="input-with-error-style border cursor-pointer mb-[10px]"
                    onChange={handleChange}
                  >
                    <option value="G">Готівка</option>
                    <option value="C">Картою онлайн</option>
                    <option value="Q">Оплата через QR при отримані</option>
                  </select>
                </div>
                {values.payment_method !== "C" && (
                  <InputWithErrorStyle
                    placeholder="Підготувати решту з:"
                    name="paid_amount"
                    type="text"
                  />
                )}
                <div className="wrap-pay-check">
                  <div className="order-finalise">
                    <div className="order-finalise-row">
                      <div>Сума</div>
                      <div>{cartTotalPrice} грн</div>
                    </div>
                    <div className="order-finalise-row">
                      <div>Доставка</div>
                      <div>59 грн</div>
                    </div>
                    <div className="order-finalise-row">
                      <div>Пакет</div>
                      <div>5 грн</div>
                    </div>
                    <div className="order-finalise-price">
                      <div>До сплати</div>
                      <div>{cartTotalPrice + 59 + 5} грн</div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="checkout-btn-courier"
                    >
                      Оформити замовлення
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </>
        )}
      </Formik>
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
    </>
  );
};

export default CourierDeliveryForm;
