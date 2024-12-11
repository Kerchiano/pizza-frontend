import { useEffect, useState } from "react";
import CityList from "./CityNavList";
import RestaurantList from "./RestaurantNavList";
import ContactList from "./ContactsNavList";
import { Menu, X } from "lucide-react";
import { useGetCategoriesQuery } from "../../apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setCityName, setCitySlug } from "../../citySlice";
import {
  selectCartItems,
  selectCartQuantity,
  selectCartToppingItems,
  selectCartTotalPrice,
} from "../../cartSlice";
import { selectIsAuthenticated } from "../../authSlice";
import HamburgerMenu from "./HamburgerMenu";
import CategoryMenu from "./CategoryMenu";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import NavCabinet from "./NavCabinet";
import NavShoppingCart from "./ShoppingCart/NavShoppingCart";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const cartItems = useSelector(selectCartItems);
  const [isToggled, setIsToggled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cityName = useSelector((state: RootState) => state.city.cityName);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories = [] } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

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

  const toggle = (
    e: React.MouseEvent<HTMLAnchorElement>,
    shouldNavigate = false
  ) => {
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
        if (shouldNavigate) {
          navigate("/checkout");
        }
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
              <RestaurantList closeMenu={closeMenu} citySlug={citySlug} />
            </div>
            <ContactList />
          </div>
          <div className="w-auto flex justify-end items-center lg:w-1/2">
            <NavCabinet isAuthenticated={isAuthenticated} />
            <NavShoppingCart toggle={toggle} cartQuantity={cartQuantity}/>
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
      <HamburgerMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        citySlug={citySlug}
      />
      <CategoryMenu
        categories={categories}
        citySlug={citySlug}
        navigate={navigate}
      />
      <ShoppingCart
        toggle={toggle}
        isToggled={isToggled}
        isCartVisible={isCartVisible}
        cartItems={cartItems}
        cartToppingItems={cartToppingItems}
        cartTotalPrice={cartTotalPrice}
      />
    </>
  );
};

export default Navbar;
