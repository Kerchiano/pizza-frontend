interface OrderSummaryProps {
  cartTotalPrice: number;
  isSubmitting: boolean;
}

const OrderSummary = ({ cartTotalPrice, isSubmitting }: OrderSummaryProps) => {
  return (
    <div className="wrap-pay-check">
      <div className="order-finalise">
        <div className="order-finalise-row">
          <div>Сума</div>
          <div>{cartTotalPrice} грн</div>
        </div>
        <div className="order-finalise-row">
          <div>Пакет</div>
          <div>5 грн</div>
        </div>
        <div className="order-finalise-price">
          <div>До сплати</div>
          <div>{cartTotalPrice + 5} грн</div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="checkout-btn-restaurant"
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
