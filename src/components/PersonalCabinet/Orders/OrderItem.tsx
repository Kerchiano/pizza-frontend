import { Order } from "../../../authApi";
import OrderDetails from "./OrderDetails";

interface OrderItemProps {
  order: Order;
  isOpen: boolean;
  handleToggle: (orderId: number) => void;
  handleOrderClick: (e: React.MouseEvent) => void;
}

const OrderItem = ({ order, isOpen, handleToggle, handleOrderClick }: OrderItemProps) => {
  const deliveryDate = new Date(order.delivery_date);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      key={order.id}
      onClick={() =>  order.id !== undefined && handleToggle(order.id)}
      className={`history-item ${isOpen ? "open" : ""}`}
    >
      <div className="title">
        <div className="title-content">
          Замовлення <strong>№{order.id}</strong>
          <p>
            Дата і час доставки {formattedDate} в {order.delivery_time}
          </p>
        </div>
        <div className="order-detail">
          <span>Деталі замовлення</span>
        </div>
      </div>
      {isOpen && (
        <OrderDetails order={order} handleOrderClick={handleOrderClick} />
      )}
    </div>
  );
};

export default OrderItem;
