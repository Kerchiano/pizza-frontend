import { useGetCitiesQuery, useGetRestaurantsByCityQuery } from "../apiSlice";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Restaurants = () => {
  const [restCityName, setRestCityName] = useState("Київ");
  const [restCitySlug, setRestSlugName] = useState("kiyiv");
  const { data: cities = [] } = useGetCitiesQuery();
  const { data: restaurants = [] } = useGetRestaurantsByCityQuery(restCitySlug);
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());
  const { citySlug } = useParams<{ citySlug: string }>();
  const navigate = useNavigate();

  const newCity = (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string,
    slug: string
  ) => {
    e.preventDefault();
    setRestCityName(name);
    setRestSlugName(slug);
    setFalse();
  };
  return (
    <>
      <main className="flex-1 w-full flex flex-col pl-20 mt-[120px]">
        <section className="restaurants-page">
          <h1 className="block-title">Ресторани</h1>
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
        </section>
        <section className="restaurants">
          <div className="restaurant-list">
            {restaurants.map((restaurant) => (
              <div key={`${restaurant.id}`} className="restaurant-item">
                <div className="img">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/${citySlug}/restaurants/${restaurant.slug}`);
                    }}
                    className="cursor-pointer text-black"
                    href={`/${citySlug}/restaurants/${restaurant.slug}`}
                  >
                    <img
                      src={`${restaurant.image_thumbnail}`}
                      alt={`${restaurant.address}`}
                    />
                  </a>
                </div>
                <div className="address">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/${citySlug}/restaurants/${restaurant.slug}`);
                    }}
                    className="cursor-pointer text-black underline hover:no-underline"
                    href={`/${citySlug}/restaurants/${restaurant.slug}`}
                  >{`${restaurant.address}`}</a>
                </div>
                <div className="worktime-phones">
                  <div className="worktime">
                    <span>Режим роботи</span>
                    <br />
                    {`${restaurant.open_time}`} - {`${restaurant.close_time}`}
                  </div>
                  <div className="phones">
                    <span>Телефони ресторану:</span>
                    <br />
                    {`${restaurant.phone_number}`}
                  </div>
                </div>
                <div className="info-wrapper">
                  <div className="info">
                    {restaurant.service.map((service) => (
                      <img
                        key={`${service.id}`}
                        src={`${service.icon}`}
                        alt={`${service.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Restaurants;
