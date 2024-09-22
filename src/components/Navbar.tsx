import { useState } from "react";
import CityList from "./CityList";
import RestaurantList from "./RestaurantList";
import ContactList from "./ContactsList";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useGetCategoriesQuery } from "../apiSlice";

const navbar = () => {
  const [cityName, setCityName] = useState("Київ");
  const [citySlug, setCitySlug] = useState("kiyiv");
  const [isOpen, setIsOpen] = useState(false);
  const { data = [] } = useGetCategoriesQuery();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const newCity = (name: string, slug: string) => {
    setCityName(name);
    setCitySlug(slug);
  };
  return (
    <>
      <div
        onClick={closeMenu}
        className="w-full flex items-center h-20 bg-custom-red bg-[url('https://raw.githubusercontent.com/Kerchiano/storage-photos/main/pizza_photos/header-background-layer.png')] relative"
      >
        <div
          onClick={toggleMenu}
          className="flex h-10 min-w-10 mr-6 ml-6 cursor-pointer items-center justify-center"
        >
          {!isOpen ? (
            <Menu size={40} color="white" />
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
            <div className="shopping-cart ml-8">
              <a className="cart-toggle inline-block relative" href="#">
                <span className="absolute">
                  <span data-cart="0" className="relative shopping-cart-icon">
                    <ShoppingBasket />
                  </span>
                </span>
                <span className="pl-8">Кошик</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute hidden lg:block w-20 cursor-pointer left-1/2 right-1/2">
          <img
            className="w-auto max-h-8"
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/main/pizza_photos/mafia-new_style-logo.png"
            alt=""
          />
        </div>
      </div>
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
            <li>
              <a href="#" className="flex px-6 py-4 w-52 items-center border-b hover:bg-orange-300">
                <img className="mr-3" src={category.icon} width={30} height={30} alt="" />
                <span className="text-black">{category.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default navbar;
