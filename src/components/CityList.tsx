import { useGetItemsQuery } from "../apiSlice";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { MapPin } from "lucide-react";

interface ICityList {
  city: string;
  newCity: (name: string, slug: string) => void;
}

const CityList = ({ city, newCity }: ICityList) => {
  const { data = [] } = useGetItemsQuery();
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string,
    slug: string
  ) => {
    e.preventDefault();
    newCity(name, slug);
    setFalse();
  };

  return (
    <div ref={dropListRef} className="ml-4 relative mr-4 text-base">
      <div
        onClick={toggle}
        className="drop-list-triangle flex cursor-pointer text-white font-medium"
      >
        <MapPin className="block lg:hidden" />
        <span className="duration-base-transition">{city}</span>
      </div>
      {isToggled && (
        <div className="drop-list-content">
          <div className="drop-list-content-scroll">
            <ul>
              {data.map((item) => (
                <li className="mt-4 mb-4" key={item.id}>
                  <a
                    onClick={(e) => handleClick(e, item.name, item.slug)}
                    className="text-zinc-600 pointer-events-auto hover:text-custom-orange duration-base-transition"
                    href={`/${item.slug}`}
                  >
                    {item.name}
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

export default CityList;
