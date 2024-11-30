import { useParams } from "react-router-dom";
import { useGetRestaurantByRestaurantSlugQuery } from "../apiSlice";
import { useState } from "react";
import ErrorPage from "./ErrorPage";

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
    return (
      <main className="pl-20 mt-30 lg:mt-20 flex w-full flex-col flex-1 bg-gray-100">
        <section className="p-[10px] mt-[20px] mb-[35px] lg:p-[60px] lg:pt-[0]">
          <div className="py-[42px]">
            <div
              className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
              role="status"
            ></div>
          </div>
        </section>
      </main>
    );
  }

  return restaurant ? (
    <>
      <main className="mt-[120px] flex-1 w-full flex flex-col pl-20">
        <section className="restaurants-page rest-detail">
          <div className="block-title">Ресторани</div>
          {isLoading ? (
            <div className="h-[32px] m-auto bg-gray-300 animate-pulse w-[400px]"></div>
          ) : (
            <h1 className="text-center text-2xl text-black font-bold">{`${restaurant?.address}`}</h1>
          )}
        </section>
        <section className="restaurant-img-section relative">
          {isLoading || !isImageLoaded ? (
            <div className="absolute inset-0 h-[650px] bg-gray-300 animate-pulse"></div>
          ) : null}
          <img
            src={`${restaurant?.image_detail}`}
            alt={restaurant?.address}
            className={`transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
          />
        </section>
        <section className="restaurant-info">
          {isLoading ? (
            <div className="block md:flex p-[40] mb-10 border-b">
              <div className="w-[30%] h-[56px] bg-gray-300 animate-pulse mb-10"></div>
              <div className="w-[30%] h-[56px] bg-gray-300 animate-pulse ml-[0%] md:ml-20%]"></div>
            </div>
          ) : (
            <div className="worktime-phones">
              <div className="worktime">
                <span>Режим роботи:</span>
                {restaurant?.open_time}-{restaurant?.close_time}
              </div>
              <div className="phones">
                <span>Телефони ресторану:</span>
                {restaurant?.phone_number}
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="h-[500px] bg-gray-300 animate-pulse border-b mb-[30px]"></div>
          ) : (
            restaurant?.description && (
              <div className="description">
                {restaurant.description.split("\n").map((line, index) => (
                  <div key={index}>
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            )
          )}
          {isLoading ? (
            <div className="py-[15px] px-[15px] border-t pt-[30px]">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-300 animate-pulse rounded-full mr-5 inline-block"
                  ></div>
                ))}
            </div>
          ) : (
            <div className="info">
              {restaurant?.service.map((service) => (
                <img key={service.id} src={service.icon} alt={service.title} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  ) : (
    <ErrorPage />
  );
};

export default RestaurantDetail;
