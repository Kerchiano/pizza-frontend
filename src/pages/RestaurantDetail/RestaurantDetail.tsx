import { useParams } from "react-router-dom";
import { useGetRestaurantByRestaurantSlugQuery } from "../../apiSlice";
import { useState } from "react";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import RestaurantImage from "./RestaurantImage";
import RestaurantInfo from "./RestaurantInfo";
import LoadingSpinner from "./LoadingSpinner";

const RestaurantDetail = () => {
  const { restaurantSlug } = useParams<{ restaurantSlug: string }>();
  const { data: restaurant, isLoading } = useGetRestaurantByRestaurantSlugQuery(
    restaurantSlug || ""
  );

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return restaurant ? (
    <>
      <main className="mt-[120px] flex-1 w-full flex flex-col pl-20">
        <section className="restaurants-page rest-detail">
          <div className="block-title">Ресторани</div>
          <h1 className="text-center text-2xl text-black font-bold">{`${restaurant?.address}`}</h1>
        </section>
        <RestaurantImage
          isImageLoaded={isImageLoaded}
          address={restaurant.address}
          image_detail={restaurant.image_detail}
          handleImageLoad={handleImageLoad}
        />
        <RestaurantInfo restaurant={restaurant} />
      </main>
    </>
  ) : (
    <ErrorPage />
  );
};

export default RestaurantDetail;
