import { Order } from "../../../authApi";

interface OrderDetailsProps {
  order: Order;
  handleOrderClick: (e: React.MouseEvent) => void;
}

const OrderDetails = ({ order, handleOrderClick }: OrderDetailsProps) => (
  <div onClick={handleOrderClick} className="order">
    {order.order_items.map((orderiItem, index) => (
      <div key={index} className="order-position">
        <div className="title">
          {orderiItem.product_title || orderiItem.topping_title} -{" "}
          {orderiItem.quantity} шт.
        </div>
        <div className="price">
          {orderiItem.product_price || orderiItem.topping_price} грн
        </div>
      </div>
    ))}
    <div className="order-sum">
      <span>Сума товарів</span>
      <span>{order.total_amount} грн</span>
    </div>
    <div className="order-delivery-price">
      <span>Ціна доставки</span>
      <span>{order.delivery_address ? 59 : 0} грн</span>
    </div>
    <div className="order-package">
      <span>Упаковка</span>
      <span>5 грн</span>
    </div>
    <div className="order-total">
      <span>Сума до оплати</span>
      <span>
        {order.delivery_address
          ? order.total_amount + 59 + 5
          : order.total_amount + 5}{" "}
        грн
      </span>
    </div>
  </div>
);

export default OrderDetails;
