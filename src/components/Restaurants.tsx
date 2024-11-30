import { useGetCitiesQuery, useGetRestaurantsByCityQuery } from "../apiSlice";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RestaurantImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="relative w-full h-[270px] bg-gray-300 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        </div>
      )}
      <img
        loading="lazy"
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

const RestaurantSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} style={{paddingBottom: "0px"}} className="restaurant-item">
        <div className="w-full h-[270px] bg-gray-300 mb-[30px] animate-pulse rounded"></div>
        <div className="mb-[30px] h-[20px] bg-gray-300 animate-pulse rounded"></div>
        <div className="flex justify-between px-[15px] mb-[30px] pt-[0px]">
          <div className="h-[40px] w-[40%] bg-gray-300 animate-pulse rounded"></div>
          <div className="h-[40px] w-[40%] bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="flex justify-between py-[15px] px-[15px] border mt-[15px]">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"
              ></div>
            ))}
        </div>
      </div>
    ));
};

const Restaurants = () => {
  const [restCityName, setRestCityName] = useState("Київ");
  const [restCitySlug, setRestSlugName] = useState("kiyiv");
  const { data: cities = [] } = useGetCitiesQuery();
  const { data: restaurants = [], isLoading, isFetching } = useGetRestaurantsByCityQuery(restCitySlug);
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
          {(isLoading || isFetching) && <RestaurantSkeleton cards={9} />}
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
                    <RestaurantImage
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
