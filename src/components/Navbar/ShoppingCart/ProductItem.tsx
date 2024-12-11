import { Minus, Plus, X } from "lucide-react";
import {
  CartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../../../cartSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";

interface ProductItemProps {
  item: CartItem;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseItemQuantity(itemId));
  };
  return (
    <div className="cart-item">
      <div className="img">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="description">
        <div className="item-title">{item.title}</div>
        <div className="item-count">
          <div className="spinner">
            <Minus
              onClick={() =>
                item.quantity > 1 && handleDecreaseQuantity(item.id)
              }
              className={`${
                item.quantity > 1 ? "text-red-500" : "text-gray-500"
              } ${item.quantity > 1 ? "cursor-pointer" : "cursor-default"}`}
            />
            <input disabled value={item.quantity} type="text" />
            <Plus
              onClick={() => handleIncreaseQuantity(item.id)}
              className="cursor-pointer text-green-500"
            />
          </div>
        </div>
        <div className="item-price">{item.price * item.quantity} грн</div>
      </div>
      <div onClick={() => handleRemoveFromCart(item.id)}>
        <X className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
};

export default ProductItem;
