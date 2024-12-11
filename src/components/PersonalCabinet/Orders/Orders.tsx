import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../../authApi";
import { RootState } from "../../../store";
import { useGetUserDetailsQuery } from "../../../authApi";
import { useState } from "react";
import OrderItem from "./OrderItem";

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
                const orderId = order.id ?? -1;
                const isOpen = openOrders[orderId];

                return (
                  <OrderItem
                    key={order.id}
                    order={order}
                    isOpen={isOpen}
                    handleToggle={handleToggle}
                    handleOrderClick={handleOrderClick}
                  />
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
