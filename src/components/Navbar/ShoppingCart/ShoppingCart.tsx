import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import ToppingItem from "./ToppingItem";
import { CartItem, Topping } from "../../../cartSlice";

interface ShoppingCartProp {
  isToggled: boolean;
  isCartVisible: boolean;
  cartItems: CartItem[];
  cartToppingItems: Topping[];
  cartTotalPrice: number;
  toggle: (
    e: React.MouseEvent<HTMLAnchorElement>,
    shouldNavigate?: boolean
  ) => void;
}

const ShoppingCart = ({
  isToggled,
  isCartVisible,
  cartItems,
  cartToppingItems,
  cartTotalPrice,
  toggle,
}: ShoppingCartProp) => {
  return (
    <div className={`pop-cart ${isToggled ? "block" : "none"}`}>
      <div
        className={`cart-container ${isCartVisible ? "active-transform" : ""}`}
      >
        <div className="title">Кошик</div>
        <div className="cart-item-list">
          {cartItems.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
          {cartToppingItems?.map((topping: Topping) => (
            <ToppingItem key={topping.id} topping={topping} />
          ))}
        </div>
        <div className="popup-summary">
          <div className="full-price">
            <span>Сума</span>
            <span>{cartTotalPrice} грн</span>
          </div>
          <Link
            onClick={(e) => toggle(e, true)}
            className="checkout-link"
            to={"/checkout"}
          >
            Оформити
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
