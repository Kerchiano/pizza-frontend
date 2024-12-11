import { City } from "../../apiSlice";

interface DropCityListProps {
  dropListRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  isToggled: boolean;
  restCityName: string;
  cities: City[];
  newCity: (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string,
    slug: string
  ) => void;
}

const DropCityList = ({
  dropListRef,
  toggle,
  isToggled,
  restCityName,
  cities,
  newCity,
}: DropCityListProps) => {
  return (
    <div ref={dropListRef} className="restaurants-filter">
      <div onClick={toggle} className="city">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href=""
          className="city-toggle"
        >{`${restCityName}`}</a>
        {isToggled && (
          <div className="cities-list-popup">
            <ul>
              {cities.map((city) => (
                <li key={`${city.id}`}>
                  <a
                    onClick={(e) => newCity(e, city.name, city.slug)}
                    href={`/${city.slug}/restaurants`}
                  >
                    {`${city.name}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropCityList;
