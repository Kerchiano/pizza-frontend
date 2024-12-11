import { Minus, Plus } from "lucide-react";
import { Product } from "../../apiSlice";
import {
  addItemToCart,
  CartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../cartSlice";
import { useDispatch } from "react-redux";

interface ProductCartControlsProps {
  productItem: (roduct: Product) => CartItem | undefined;
  product: Product;
}

const ProductCartControls = ({
  productItem,
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
    <div className="price-cart">
      {!productItem(product)?.quantity ? (
        <div style={{ height: "52px" }} className="price-btn">
          <span
            onClick={() => product && handleAddToCart(product)}
            className="block px-0 py-1"
          >
            Замовити
          </span>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#8c9f3f", color: "#fff" }}
          className="price-btn"
        >
          <div className="button-active">
            <Minus
              onClick={() => {
                const item = productItem(product);
                if (item && item.quantity > 1) {
                  handleDecreaseQuantity(item.id);
                }
              }}
              className={`${
                productItem(product)?.quantity &&
                productItem(product)!.quantity > 1
                  ? "hover:opacity-70"
                  : ""
              }`}
              height={30}
              width={30}
            />
            <input
              disabled
              value={productItem(product)?.quantity}
              type="text"
            />
            <Plus
              onClick={() => {
                const item = productItem(product);
                item && handleIncreaseQuantity(item.id);
              }}
              className="hover:opacity-70"
              height={30}
              width={30}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCartControls;
