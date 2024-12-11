import { useDispatch } from "react-redux";
import {
  addToppingItemToCart,
  decreaseToppingItemQuantity,
  increaseToppingItemQuantity,
  Topping,
} from "../../cartSlice";

interface ProductToppingsProps {
  toppings: Topping[];
  productId: number;
  cartToppingItems: Topping[];
}

const ProductToppings = ({
  toppings,
  productId,
  cartToppingItems,
}: ProductToppingsProps) => {
  const dispatch = useDispatch();

  const handleToppingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number,
    topping: Topping,
    cartToppingItems: Topping[],
    handleAddItemToppingToCart: (productId: number, topping: Topping) => void,
    handleIncreaseToppingQuantity: (toppingId: number) => void,
    handleDecreaseToppingQuantity: (toppingId: number) => void
  ) => {
    if (e.target.checked) {
      const productToppingExists = cartToppingItems.some(
        (existingTopping) => existingTopping.id === topping.id
      );
      if (!productToppingExists) {
        handleAddItemToppingToCart(productId, topping);
      } else {
        handleIncreaseToppingQuantity(topping.id);
      }
    } else {
      handleDecreaseToppingQuantity(topping.id);
    }
  };

  const handleAddItemToppingToCart = (itemId: number, topping: Topping) => {
    dispatch(addToppingItemToCart({ itemId, topping }));
  };

  const handleIncreaseToppingQuantity = (toppingId: number) => {
    dispatch(increaseToppingItemQuantity(toppingId));
  };

  const handleDecreaseToppingQuantity = (toppingId: number) => {
    dispatch(decreaseToppingItemQuantity(toppingId));
  };
  return (
    <div className="mobile-supplements-content">
      {toppings.map((topping) => (
        <label key={`${topping.id}`} className="mobile-supplements-item">
          <input
            className="hidden"
            type="checkbox"
            onChange={(e) =>
              handleToppingChange(
                e,
                productId,
                topping,
                cartToppingItems,
                handleAddItemToppingToCart,
                handleIncreaseToppingQuantity,
                handleDecreaseToppingQuantity
              )
            }
          />
          <span className="mobile-supplements-item-name">{topping.title}</span>
          <span className="mobile-supplements-item-price">
            <span className="without_price">Без</span>
            <span className="with_price">{`+${topping.price} грн`}</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default ProductToppings;
