import { useGetRestaurantsByCityQuery } from "../apiSlice";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IRestaurantList {
  citySlug: string;
  closeMenu: () => void;
}

const RestaurantList = ({ citySlug, closeMenu }: IRestaurantList) => {
  const { data = [] } = useGetRestaurantsByCityQuery(citySlug);
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());
  const navigate = useNavigate();
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();
    setFalse();
    navigate(`/${citySlug}/restaurants/${slug}`);
    closeMenu()
  };

  return (
    <div ref={dropListRef} className="ml-8 relative mr-4 text-base  lg:ml-4 ">
      <div
        onClick={toggle}
        className="drop-list-triangle flex cursor-pointer text-white font-medium"
      >
        <UtensilsCrossed className="hidden sm:block lg:hidden" />
        <span className="duration-base-transition block sm:hidden lg:block text-black lg:text-white">
          Ресторани
        </span>
      </div>
      {isToggled && (
        <div className="drop-list-content w-[380px]">
          <div className="drop-list-content-scroll">
            <ul>
              <li className="mt-4 mb-4">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setFalse();
                    navigate(`/${citySlug}/restaurants`);
                    closeMenu()
                  }}
                  className="text-zinc-600 pointer-events-auto hover:text-custom-orange duration-base-transition"
                  href={`/${citySlug}/restaurants`}
                >
                  Всі ресторани
                </a>
              </li>
              {data.map((item) => (
                <li className="mt-4 mb-4" key={item.id}>
                  <a
                    onClick={(e) => handleClick(e, item.slug)}
                    className="text-zinc-600 pointer-events-auto hover:text-custom-orange duration-base-transition"
                    href={`/${citySlug}/restaurants/${item.slug}`}
                  >
                    {item.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
