import React from "react";
import {
  addToppingItemToCart,
  decreaseToppingItemQuantity,
  increaseToppingItemQuantity,
  Topping,
} from "../../cartSlice";
import { useDispatch } from "react-redux";

interface ProductToppingProps {
  toppings: Topping[];
  productId: number;
  cartToppingItems: Topping[];
}

const ProductTopping = ({
  toppings,
  productId,
  cartToppingItems,
}: ProductToppingProps) => {
  const dispatch = useDispatch();

  const handleAddItemToppingToCart = (itemId: number, topping: Topping) => {
    dispatch(addToppingItemToCart({ itemId, topping }));
  };

  const handleIncreaseToppingQuantity = (toppingId: number) => {
    dispatch(increaseToppingItemQuantity(toppingId));
  };

  const handleDecreaseToppingQuantity = (toppingId: number) => {
    dispatch(decreaseToppingItemQuantity(toppingId));
  };

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
  return (
    <div className="product-additional">
      {toppings.map((topping: Topping, index) => (
        <label key={topping.id}>
          <input
            type="checkbox"
            id={`topping-${index}`}
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
          <span className="product-additional-name">{topping.title}</span>
          <span className="product-additional-price">{`+${topping.price} грн`}</span>
        </label>
      ))}
    </div>
  );
};

export default ProductTopping;
