import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Link, useLocation } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  decreaseToppingItemQuantity,
  increaseItemQuantity,
  increaseToppingItemQuantity,
  removeItemFromCart,
  removeToppingItemFromCart,
  selectCartItems,
  selectCartQuantity,
  selectCartToppingItems,
  selectCartTotalPrice,
  Topping,
} from "../cartSlice";
import { selectIsAuthenticated } from "../authSlice";
import { useEffect, useState } from "react";
import CourierDeliveryForm from "./CourierDeliveryForm";
import { useGetUserAddressesQuery, useGetUserDetailsQuery } from "../authApi";
import { Address } from "./AddressItem";
import RestaurantDeliveryForm from "./RestaurantDeliveryForm";

const Checkout = () => {
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const cartItems = useSelector(selectCartItems);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const location = useLocation();
  const redirectPath = location.pathname;
  const [activeTab, setActiveTab] = useState(true);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: userDetails, refetch: refetchUserDetails } =
    useGetUserDetailsQuery(undefined, {
      skip: !token,
    });

  const { data: addressesData, refetch: refetchUserAddresses } =
    useGetUserAddressesQuery(userDetails?.email || "", {
      skip: !userDetails?.email,
    });

  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (addressesData) {
      setAddresses(addressesData);
    }
  }, [addressesData]);

  const handleTabClick = (tab: boolean) => {
    setActiveTab(tab);
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleIncreaseToppingQuantity = (toppingId: number) => {
    dispatch(increaseToppingItemQuantity(toppingId));
  };

  const handleDecreaseToppingQuantity = (toppingId: number) => {
    dispatch(decreaseToppingItemQuantity(toppingId));
  };

  const handleRemoveToppingFromCart = (toppingId: number) => {
    dispatch(removeToppingItemFromCart(toppingId));
  };

  useEffect(() => {
    if (token) {
      if (refetchUserDetails) {
        refetchUserDetails();
      }
    }
  }, [token, refetchUserDetails]);

  useEffect(() => {
    if (userDetails?.email && refetchUserAddresses) {
      refetchUserAddresses();
    }
  }, [userDetails, refetchUserAddresses]);

  return (
    <main className="checkout-main">
      <section className="checkout-page">
        <div className="checkout-container">
          <h1>Оформлення замовлення</h1>
          <div className="checkout-cart">
            <div className="checkout-list-header">
              <div className="title">Назва</div>
              <div className="checkout-price">Ціна</div>
              <div className="amount">Кількість</div>
              <div className="sum">Всього</div>
            </div>
            <div className="checkout-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <Link
                    className="img"
                    to={`/${citySlug}/product/${item.slug}`}
                  >
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <Link
                    className="title"
                    to={`/${citySlug}/product/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                  <div className="price">{item.price} грн</div>
                  <div className="checkout-count">
                    <div className="checkout-spinner">
                      <Minus
                        onClick={() =>
                          item.quantity > 1 && handleDecreaseQuantity(item.id)
                        }
                        className={`${
                          item.quantity > 1 ? "text-red-500" : "text-gray-500"
                        } ${
                          item.quantity > 1
                            ? "cursor-pointer"
                            : "cursor-default"
                        }`}
                      />
                      <input disabled value={item.quantity} type="text" />
                      <Plus
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="cursor-pointer text-green-500"
                      />
                    </div>
                  </div>
                  <div className="item-sum">
                    {item.quantity * item.price} грн
                  </div>
                  <div
                    className="checkout-remove-item"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <X className="cursor-pointer text-red-500" />
                  </div>
                </div>
              ))}
              {cartToppingItems?.map((topping: Topping) => (
                <div key={topping.id} className="checkout-item">
                  <div className="img">
                    <img src="" />
                  </div>
                  <div className="title">{topping.title}</div>
                  <div className="price">{topping.price} грн</div>
                  <div className="checkout-count">
                    <div className="checkout-spinner">
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
                  <div className="item-sum">
                    {topping.price * topping.quantity} грн
                  </div>
                  <div
                    className="checkout-remove-item"
                    onClick={() => handleRemoveToppingFromCart(topping.id)}
                  >
                    <X className="cursor-pointer text-red-500" />
                  </div>
                </div>
              ))}
              <div className="checkout-cart-footer">
                <span>В кошику {cartQuantity} товарів</span>
                <div className="final-sum">
                  Сума за всі товари <span>{cartTotalPrice} грн</span>
                </div>
              </div>
            </div>
          </div>
          {!isAuthenticated ? (
            <div className="checkout-auth">
              <div className="checkout-auth-container">
                <div className="w-full text-center">
                  <Link
                    to={`/login?redirect=${redirectPath}`}
                    className="text-black text-[30px] font-medium leading-[40px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-black after:scale-x-0 hover:after:scale-x-100 transition-transform"
                  >
                    Вхід
                  </Link>
                  <span className="text-[30px] text-black text-center leading-[40px] font-medium ml-2 mr-2">
                    /
                  </span>
                  <Link
                    to={`/registration?redirect=${redirectPath}`}
                    className="text-black text-[30px] font-medium leading-[40px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-black after:scale-x-0 hover:after:scale-x-100 transition-transform"
                  >
                    Реєстрація
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="checkout">
              <div className="delivery-tabs">
                <div
                  onClick={() => handleTabClick(true)}
                  className={
                    activeTab === true ? "checkout-tab active" : "checkout-tab"
                  }
                >
                  <div className="text">
                    <div>Забрати самому</div>
                    <div>Безкоштовно</div>
                  </div>
                  <div className="price">{cartTotalPrice} грн</div>
                </div>
                <div
                  onClick={() => handleTabClick(false)}
                  className={
                    activeTab === false ? "checkout-tab active" : "checkout-tab"
                  }
                >
                  <div className="text">
                    <div>Доставка кур'єром</div>
                    <div>59 грн</div>
                  </div>
                  <div className="price">{cartTotalPrice + 59} грн</div>
                </div>
              </div>
              {!activeTab ? (
                <>
                  <div className="courier-delivery">
                    {userDetails && (
                      <CourierDeliveryForm
                        userDetails={userDetails}
                        addresses={addresses}
                      />
                    )}
                  </div>
                  
                </>
              ) : (
                <>
                  <div className="restaurant-delivery">
                    {userDetails && (
                      <RestaurantDeliveryForm userDetails={userDetails} />
                    )}
                  </div>
                  
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Checkout;
