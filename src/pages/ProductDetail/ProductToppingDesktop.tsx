import { useDispatch } from "react-redux";
import { addToppingItemToCart, decreaseToppingItemQuantity, increaseToppingItemQuantity, Topping } from "../../cartSlice";

interface ProductToppingDesktopProps {
  category: string;
  toppings: Topping[];
  productId: number;
  cartToppingItems: Topping[];
}

const ProductToppingDesktop = ({
  category,
  toppings,
  productId,
  cartToppingItems,
}: ProductToppingDesktopProps) => {
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
    <>
      {category == "Піци" && (
        <div className="supplements-less">
          <p className="supplements-title">Добавки</p>
          <div className="supplements-content">
            {toppings.map((topping) => (
              <div key={`${topping.id}`} className="supplements-content-item">
                <label className="supplements-item">
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
                  <span className="supplements-item-name">{topping.title}</span>
                  <span className="supplements-item-price">
                    {`+${topping.price}`}
                    <span> грн</span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductToppingDesktop;
