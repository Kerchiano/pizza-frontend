import { useEffect, useState } from "react";
import CityList from "./CityList";
import RestaurantList from "./RestaurantList";
import ContactList from "./ContactsList";
import { Menu, Minus, Plus, ShoppingBasket, X } from "lucide-react";
import { useGetCategoriesQuery } from "../apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setCityName, setCitySlug } from "../citySlice";
import {
  decreaseItemQuantity,
  decreaseToppingItemQuantity,
  increaseItemQuantity,
  increaseToppingItemQuantity,
  removeItemFromCart,
  removeToppingItemFromCart,
  selectCartQuantity,
  selectCartToppingItems,
  selectCartTotalPrice,
  Topping,
} from "../cartSlice";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isToggled, setIsToggled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cityName = useSelector((state: RootState) => state.city.cityName);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const [isOpen, setIsOpen] = useState(false);
  const { data = [] } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const newCity = (name: string, slug: string) => {
    dispatch(setCityName(name));
    dispatch(setCitySlug(slug));
    navigate(`/${slug}`);
  };

  const toggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!isToggled && cartQuantity > 0) {
      setIsToggled(true);
      document.body.style.overflowY = "hidden";
      setTimeout(() => {
        setIsCartVisible(true);
      }, 100);
    } else {
      setIsCartVisible(false);

      setTimeout(() => {
        setIsToggled(false);
        document.body.style.overflowY = "auto";
      }, 300);
    }
  };

  useEffect(() => {
    if (cartQuantity === 0) {
      setIsCartVisible(false);

      setTimeout(() => {
        setIsToggled(false);
        document.body.style.overflowY = "auto";
      }, 300);
    }
  }, [cartQuantity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const cartContainer = document.querySelector(".cart-container");
  
      if (cartContainer && !cartContainer.contains(event.target as Node)) {
        setIsCartVisible(false);
        setTimeout(() => {
          setIsToggled(false);
          document.body.style.overflowY = "auto";
        }, 300);
      }
    };
  
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleIncreaseToppingQuantity = ( toppingId: number) => {
    dispatch(increaseToppingItemQuantity(toppingId));
  };

  const handleDecreaseToppingQuantity = ( toppingId: number) => {
    dispatch(decreaseToppingItemQuantity(toppingId));
  };

  const handleRemoveToppingFromCart = ( toppingId: number) => {
    dispatch(removeToppingItemFromCart(toppingId));
  };
  return (
    <>
      <header
        onClick={closeMenu}
        className="w-full flex items-center bg-custom-red bg-[url('https://raw.githubusercontent.com/Kerchiano/storage-photos/main/pizza_photos/header-background-layer.png')]"
      >
        <div
          onClick={toggleMenu}
          className="flex h-10 px-4 py-0 sm:px-6 sm:py-0 min-w-10 cursor-pointer items-center justify-center"
        >
          {!isOpen ? (
            <Menu className="h-8 sm:h-10" size={40} color="white" />
          ) : (
            <X size={40} color="white" />
          )}
        </div>
        <div className="w-[calc(100%-80px)] flex pl-3 pr-3 justify-end">
          <div className="w-auto flex justify-start items-center lg:w-1/2">
            <CityList city={cityName} newCity={newCity} />
            <div className="hidden sm:block">
              <RestaurantList citySlug={citySlug} />
            </div>
            <ContactList />
          </div>
          <div className="w-auto flex justify-end items-center lg:w-1/2">
            <div className="user-cabinet ml-8 hidden sm:block lg:block">
              <a href="#">
                <span className="text-white hover:text-gray-400 font-medium cursor-pointer hidden lg:block">
                  Кабінет
                </span>
                <img
                  className="min-w-10 h-10 block lg:hidden"
                  src="https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/mafia_logo.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="shopping-cart ml-2 sm:ml-7">
              <a
                onClick={toggle}
                className="cart-toggle flex sm:flex relative"
                href=""
              >
                <span
                  data-cart={cartQuantity}
                  className="relative shopping-cart-icon"
                >
                  <ShoppingBasket />
                </span>
                <span className="pl-2 hidden sm:inline-block">Кошик</span>
              </a>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(`/${citySlug}`)}
          className="absolute w-20 cursor-pointer left-16 sm:left-24 lg:left-1/2"
        >
          <img
            className="w-auto max-h-8 logo-mafia"
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/main/pizza_photos/mafia-new_style-logo.png"
            alt=""
          />
        </div>
      </header>
      <div className={`hamburger-menu ${isOpen ? "open" : "closed"}`}>
        <div className="wrapper-hamburger-menu-top hover:text-transparent">
          <div className="user-cabinet ml-8 flex justify-center">
            <a href="#" className="inline-block">
              <span className="text-black font-medium cursor-pointer block sm:hidden">
                Кабінет
              </span>
            </a>
            <div className="inline-block rs-list sm:hidden">
              <RestaurantList citySlug={citySlug} />
            </div>
          </div>
        </div>
      </div>
      <div className="category-menu hover:not-main-page">
        <ul>
          {data.map((category) => (
            <li
              key={category.id}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${citySlug}/products/${category.slug}`);
              }}
            >
              <a
                href="#"
                className="flex px-6 py-4 w-52 items-center border-b hover:bg-orange-300"
              >
                <img className="mr-3 h-8 w-8" src={category.icon} alt="" />
                <span className="text-black">{category.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`pop-cart ${isToggled ? "block" : "none"}`}>
        <div
          className={`cart-container ${
            isCartVisible ? "active-transform" : ""
          }`}
        >
          <div className="title">Кошик</div>
          <div className="cart-item-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
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
                  <div className="item-price">{item.price * item.quantity} грн</div>
                </div>
                <div onClick={() => handleRemoveFromCart(item.id)}>
                  <X className="cursor-pointer text-red-500" />
                </div>
              </div>
            ))}
            {cartToppingItems?.map((topping: Topping, index) => (
              <div key={topping.id + index} className="cart-item">
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
                        onClick={() => handleIncreaseToppingQuantity(topping.id)}
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
            ))}
          </div>
          <div className="popup-summary">
            <div className="full-price">
              <span>Сума</span>
              <span>{cartTotalPrice} грн</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
