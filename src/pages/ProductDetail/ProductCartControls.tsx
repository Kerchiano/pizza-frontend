import { Minus, Plus } from "lucide-react";
import { Product } from "../../apiSlice";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  CartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../cartSlice";

interface ProductCartControlsProps {
  productCartItem: CartItem | undefined;
  product: Product;
}

const ProductCartControls = ({
  productCartItem,
  product,
}: ProductCartControlsProps) => {
  const dispatch = useDispatch();
  const handleAddToCart = (item: Product) => {
    const newItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      slug: item.slug,
      quantity: 1,
      image: item.image,
      options: item.topping,
    };
    dispatch(addItemToCart(newItem));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseItemQuantity(itemId));
  };
  return (
    <div className="bottom">
      <div className="price-wrap-btn">
        <div className="bottom-price">
          <div className="price-less">
            <span>{`${product?.price}`} грн</span>
          </div>
          {!productCartItem?.quantity ? (
            <a
              onClick={() => product && handleAddToCart(product)}
              className="product-buy-button"
            >
              <span>Замовити</span>
            </a>
          ) : (
            <a className="product-buy-button">
              <div className="button-active">
                <Minus
                  onClick={() =>
                    productCartItem?.quantity > 1 &&
                    handleDecreaseQuantity(productCartItem?.id)
                  }
                  className={`${
                    productCartItem?.quantity > 1 && "hover:opacity-70"
                  }`}
                  height={30}
                />
                <input disabled value={productCartItem?.quantity} type="text" />
                <Plus
                  onClick={() => product && handleIncreaseQuantity(product.id)}
                  className="hover:opacity-70"
                  height={30}
                />
              </div>
            </a>
          )}
        </div>
      </div>
      <div className="free-delivery">
        Безкоштовна доставка при замовленні від 950 грн
      </div>
      <div className="discount">
        Знижка 20%, якщо забираєте замовлення з ресторану
      </div>
    </div>
  );
};

export default ProductCartControls;
