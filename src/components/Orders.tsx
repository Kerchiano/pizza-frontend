import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../authApi";
import { RootState } from "../store";
import { useGetUserDetailsQuery } from "../authApi";
import { useState } from "react";

export const Orders = () => {
  const [openOrders, setOpenOrders] = useState<{ [key: number]: boolean }>({});
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: userDetails, isLoading } = useGetUserDetailsQuery(undefined, {
    skip: !token,
  });

  const { data: orders = [], isLoading: orderIsLoading } = useGetOrdersQuery(
    userDetails?.id || 0,
    {
      skip: !userDetails?.id,
    }
  );

  const handleToggle = (orderId: number) => {
    setOpenOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="history-container">
        <div className="history-block">
          <div className="title">Історія замовлень</div>
          <div className="history-list">
            {isLoading || orderIsLoading ? (
              <div
                className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto"
                role="status"
              ></div>
            ) : orders && orders.length > 0 ? (
              orders.map((order) => {
                const deliveryDate = new Date(order.delivery_date);

                const formattedDate = deliveryDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                const orderId = order.id ?? -1;
                const isOpen = openOrders[orderId];

                return (
                  <div
                    key={order.id}
                    onClick={() =>
                      order.id !== undefined && handleToggle(order.id)
                    }
                    className={`history-item ${isOpen ? "open" : ""}`}
                  >
                    <div className="title">
                      <div className="title-content">
                        Замовлення
                        <strong> №{order.id}</strong>
                        <p>
                          Дата і час доставки {formattedDate} в{" "}
                          {order.delivery_time}
                        </p>
                      </div>
                      <div className="order-detail">
                        <span>Деталі замовлення</span>
                      </div>
                    </div>
                    {isOpen && (
                      <div onClick={handleOrderClick} className="order">
                        {order.order_items.map((orderiItem, index) => (
                          <div key={index} className="order-position">
                            <div className="title">
                              {orderiItem.product_title ||
                                orderiItem.topping_title}{" "}
                              - {orderiItem.quantity} шт.
                            </div>
                            <div className="price">
                              {orderiItem.product_price ||
                                orderiItem.topping_price}{" "}
                              грн
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
                    )}
                  </div>
                );
              })
            ) : (
              <div className="not-orders">Нема замовлень для відображення</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
