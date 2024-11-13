import { useParams } from "react-router-dom";
import { Product, useGetProductQuery } from "../apiSlice";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  addToppingItemToCart,
  decreaseItemQuantity,
  decreaseToppingItemQuantity,
  increaseItemQuantity,
  increaseToppingItemQuantity,
  selectCartItems,
  selectCartToppingItems,
  Topping,
} from "../cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: product } = useGetProductQuery(productSlug || "");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const productItem = cartItems.find((item) => product?.id == item.id);
  const сartToppingItems = useSelector(selectCartToppingItems);

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
    <>
      <main>
        <section className="product-page">
          <div className="product-page-content">
            <div className="product-page-inside">
              <div className="product-img">
                <img src={`${product?.image}`} alt="" />
              </div>
              <div className="product-detail-description">
                <h1>{`${product?.title}`}</h1>
                <div className="description">
                  <div className="less">
                    <div className="description-desktop">
                      <p>Інгредієнти</p>
                      Філе куряче sous-vide, шинка, мисливські ковбаски,
                      пепероні, сир Моцарела, печериці, петрушка, цибуля
                      ріпчаста, соус BBQ та трюфельна олія
                    </div>
                  </div>
                </div>
                <div className="mobile-supplements-content">
                  {product?.topping.map((topping) => (
                    <label
                      key={`${topping.id}`}
                      className="mobile-supplements-item"
                    >
                      <input
                        className="hidden"
                        type="checkbox"
                        onChange={(e) =>
                          handleToppingChange(
                            e,
                            product.id,
                            topping,
                            сartToppingItems,
                            handleAddItemToppingToCart,
                            handleIncreaseToppingQuantity,
                            handleDecreaseToppingQuantity
                          )
                        }
                      />
                      <span className="mobile-supplements-item-name">{`${topping.title}`}</span>
                      <span className="mobile-supplements-item-price">
                        <span className="without_price">Без</span>
                        <span className="with_price">{`+${topping.price} грн`}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="supplements-less">
                  <p className="supplements-title">Добавки</p>
                  <div className="supplements-content">
                    {product?.topping.map((topping) => (
                      <div
                        key={`${topping.id}`}
                        className="supplements-content-item"
                      >
                        <label className="supplements-item">
                          <input
                            className="hidden"
                            type="checkbox"
                            onChange={(e) =>
                              handleToppingChange(
                                e,
                                product.id,
                                topping,
                                сartToppingItems,
                                handleAddItemToppingToCart,
                                handleIncreaseToppingQuantity,
                                handleDecreaseToppingQuantity
                              )
                            }
                          />
                          <span className="supplements-item-name">{`${topping.title}`}</span>
                          <span className="supplements-item-price">
                            {`+${topping.price}`}
                            <span> грн</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bottom">
                  <div className="price-wrap-btn">
                    <div className="bottom-price">
                      <div className="price-less">
                        <span>{`${product?.price}`} грн</span>
                      </div>
                      {!productItem?.quantity ? (
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
                                productItem?.quantity > 1 &&
                                handleDecreaseQuantity(productItem?.id)
                              }
                              className={`${
                                productItem?.quantity > 1 && "hover:opacity-70"
                              }`}
                              height={30}
                            />
                            <input
                              disabled
                              value={productItem?.quantity}
                              type="text"
                            />
                            <Plus
                              onClick={() =>
                                product && handleIncreaseQuantity(product.id)
                              }
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
                <div className="description-mobile">
                  <div className="less">
                    <div className="description-mobile">
                      Філе куряче sous-vide, шинка, мисливські ковбаски,
                      пепероні, сир Моцарела, печериці, петрушка, цибуля
                      ріпчаста, соус BBQ та трюфельна олія
                    </div>
                  </div>
                </div>
                <div className="mobile-bottom">
                  <div className="mobile-bottom-container">
                    <div className="free-delivery">
                      Безкоштовна доставка при замовленні від 950 грн
                    </div>
                    <div className="discount">
                      Знижка 20%, якщо забираєте замовлення з ресторану
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetail;
