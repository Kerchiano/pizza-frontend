import { useGetRestaurantsByCityQuery } from "../apiSlice";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { UtensilsCrossed } from "lucide-react";

interface IRestaurantList {
  citySlug: string;
}

const RestaurantList = ({ citySlug }: IRestaurantList) => {
  const { data = [] } = useGetRestaurantsByCityQuery(citySlug);
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());

  return (
    <div ref={dropListRef} className="ml-8 relative mr-4 text-base lg:ml-4 ">
      <a onClick={toggle} href="#" className="drop-list-triangle flex">
        <UtensilsCrossed className="hidden sm:block lg:hidden" />
        <span className="duration-base-transition block sm:hidden lg:block">Ресторани</span>
      </a>
      {isToggled && (
        <div className="drop-list-content w-[380px]">
          <div className="drop-list-content-scroll">
            <ul>
              <li className="mt-4 mb-4">
                <a
                  onClick={() => {
                    setFalse();
                  }}
                  className="text-zinc-600 pointer-events-auto hover:text-custom-orange duration-base-transition"
                  href="#"
                >
                  Всі ресторани
                </a>
              </li>
              {data.map((item) => (
                <li className="mt-4 mb-4" key={item.id}>
                  <a
                    onClick={() => {
                      setFalse();
                    }}
                    className="text-zinc-600 pointer-events-auto hover:text-custom-orange duration-base-transition"
                    href="#"
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
