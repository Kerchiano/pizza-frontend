import { Link } from "react-router-dom";
import RestaurantList from "./RestaurantNavList";

interface HamburgerMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  isAuthenticated: boolean;
  citySlug: string;
}

const HamburgerMenu = ({
  isOpen,
  closeMenu,
  isAuthenticated,
  citySlug,
}: HamburgerMenuProps) => {
  return (
    <div className={`hamburger-menu ${isOpen ? "open" : "closed"}`}>
      <div className="wrapper-hamburger-menu-top hover:text-transparent">
        <div className="user-cabinet ml-8 flex justify-center">
          {isAuthenticated ? (
            <Link
              onClick={closeMenu}
              to="/profile/personal_data"
              className="inline-block"
            >
              <span className="text-black font-medium cursor-pointer block sm:hidden">
                Кабінет
              </span>
            </Link>
          ) : (
            <Link onClick={closeMenu} to="/login" className="inline-block">
              <span className="text-black font-medium cursor-pointer block sm:hidden">
                Вхід
              </span>
            </Link>
          )}
          <div className="inline-block rs-list sm:hidden">
            <RestaurantList closeMenu={closeMenu} citySlug={citySlug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
