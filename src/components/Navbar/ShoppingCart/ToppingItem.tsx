import { Minus, Plus, X } from "lucide-react";
import {
  decreaseToppingItemQuantity,
  increaseToppingItemQuantity,
  removeToppingItemFromCart,
  Topping,
} from "../../../cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

interface ToppingItemProps {
  topping: Topping;
}

const ToppingItem = ({ topping }: ToppingItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const handleRemoveToppingFromCart = (itemId: number) => {
    dispatch(removeToppingItemFromCart(itemId));
  };

  const handleIncreaseToppingQuantity = (itemId: number) => {
    dispatch(increaseToppingItemQuantity(itemId));
  };

  const handleDecreaseToppingQuantity = (itemId: number) => {
    dispatch(decreaseToppingItemQuantity(itemId));
  };
  return (
    <div className="cart-item">
    <div className="img">
      <img src="" />
    </div>
    <div className="description">
      <div className="item-title">{topping.title}</div>
      <div className="item-count">
        <div className="spinner">
          <Minus
            onClick={() =>
              topping.quantity > 1 &&
              handleDecreaseToppingQuantity(topping.id)
            }
            className={`${
              topping.quantity > 1
                ? "text-red-500"
                : "text-gray-500"
            } ${
              topping.quantity > 1
                ? "cursor-pointer"
                : "cursor-default"
            }`}
          />
          <input disabled value={topping.quantity} type="text" />
          <Plus
            onClick={() =>
              handleIncreaseToppingQuantity(topping.id)
            }
            className="cursor-pointer text-green-500"
          />
        </div>
      </div>
      <div className="item-price">
        {topping.price * topping.quantity} грн
      </div>
    </div>
    <div onClick={() => handleRemoveToppingFromCart(topping.id)}>
      <X className="cursor-pointer text-red-500" />
    </div>
  </div>
  );
};

export default ToppingItem;
