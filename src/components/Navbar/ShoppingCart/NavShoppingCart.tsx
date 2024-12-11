import { ShoppingBasket } from "lucide-react";
import React from "react";

interface NavShoppingCartProps {
  toggle: (
    e: React.MouseEvent<HTMLAnchorElement>,
    shouldNavigate?: boolean
  ) => void;
  cartQuantity: number;
}

const NavShoppingCart = ({ toggle, cartQuantity }: NavShoppingCartProps) => {
  return (
    <div className="shopping-cart ml-2 sm:ml-7">
      <a onClick={toggle} className="cart-toggle flex sm:flex relative" href="">
        <span data-cart={cartQuantity} className="relative shopping-cart-icon">
          <ShoppingBasket />
        </span>
        <span className="pl-2 hidden sm:inline-block">Кошик</span>
      </a>
    </div>
  );
};

export default NavShoppingCart;
