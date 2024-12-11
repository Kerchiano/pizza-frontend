import { format } from "date-fns";
import { OrderItem, User } from "../../../../authApi";
import { Address } from "../../../PersonalCabinet/PersonalData/AddressItem";

export const getInitialValues = (
  userDetails: User | null,
  addresses: Address[],
  cartTotalPrice: number,
  orderItems: OrderItem[]
) => ({
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
});