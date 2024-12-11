import { Address } from "../../../PersonalCabinet/PersonalData/AddressItem";
import { authApi, OrderItem, User } from "../../../../authApi";

interface Values {
  first_name: string;
  phone_number: string;
  user: number | undefined;
  total_amount: number;
  paid_amount: string;
  delivery_address: number | undefined;
  payment_method: string;
  city: string;
  street: string;
  house_number: number | string;
  floor: number | string;
  entrance: number | string;
  flat: number | string;
  delivery_date: string;
  delivery_time: string;
  order_items: OrderItem[];
}

type AddAddressMutation = ReturnType<typeof authApi.endpoints.addAddress.useMutation>;
type AddAddressFunction = AddAddressMutation[0];

type addOrderMutation = ReturnType<typeof authApi.endpoints.addOrder.useMutation>;
type addOrderFunction = addOrderMutation[0];

interface HandleSubmitProps {
  values: Values;
  setSubmitting: (isSubmitting: boolean) => void;
  addresses: Address[];
  userDetails: User;
  openModal: () => void;
  addAddress: AddAddressFunction;
  addOrder: addOrderFunction;
}

export const handleSubmit = async ({
  values,
  setSubmitting,
  addresses,
  userDetails,
  openModal,
  addAddress,
  addOrder,
}: HandleSubmitProps) => {
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
            (key) => addressData[key] !== selectedAddress[key as keyof Address]
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
};
