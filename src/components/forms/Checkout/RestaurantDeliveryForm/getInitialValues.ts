import { format } from "date-fns";
import { OrderItem, User } from "../../../../authApi";

export const getInitialValues = (
  userDetails: User | null,
  cartTotalPrice: number,
  orderItems: OrderItem[]
) => ({
  first_name: userDetails?.first_name || "",
  phone_number: userDetails?.phone_number || "",
  user: userDetails?.id || 0,
  total_amount: cartTotalPrice + 5,
  restaurant: undefined,
  payment_method: "G",
  delivery_date: format(new Date(), "yyyy-MM-dd"),
  delivery_time: "",
  order_items: orderItems,
});
