import {
  useGetCitiesQuery,
  useGetRestaurantsByCityQuery,
} from "../../apiSlice";
import useClickOutside from "../../components/hooks/useClickOutside";
import useToggle from "../../components/hooks/useToggle";
import { useState } from "react";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";
import RestaurantCardItem from "./RestaurantCardItem";
import DropCityList from "./DropCityList";

const Restaurants = () => {
  const [restCityName, setRestCityName] = useState("Київ");
  const [restCitySlug, setRestSlugName] = useState("kiyiv");
  const { data: cities = [] } = useGetCitiesQuery();
  const {
    data: restaurants = [],
    isLoading,
    isFetching,
  } = useGetRestaurantsByCityQuery(restCitySlug);
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());

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
          <DropCityList
            cities={cities}
            dropListRef={dropListRef}
            isToggled={isToggled}
            newCity={newCity}
            restCityName={restCityName}
            toggle={toggle}
          />
        </section>
        <section className="restaurants">
          <div className="restaurant-list">
            {(isLoading || isFetching) && <RestaurantCardSkeleton cards={9} />}
            {restaurants.map((restaurant) => (
              <RestaurantCardItem key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Restaurants;
