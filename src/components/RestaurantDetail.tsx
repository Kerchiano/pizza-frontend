import { useParams } from "react-router-dom";
import { useGetRestaurantByRestaurantSlugQuery } from "../apiSlice";

const RestaurantDetail = () => {
  const { restaurantSlug } = useParams<{ restaurantSlug: string }>();
  const { data: restaurant } = useGetRestaurantByRestaurantSlugQuery(
    restaurantSlug || ""
  );

  return (
    <>
      <main className="mt-[120px] flex-1 w-full flex flex-col pl-20">
        <section className="restaurants-page rest-detail">
          <div className="block-title">Ресторани</div>
          <h1 className="text-center text-2xl text-black font-bold">{`${restaurant?.address}`}</h1>
        </section>
        <section className="restaurant-img-section">
          <img src={`${restaurant?.image_detail}`} alt="" />
        </section>
        <section className="restaurant-info">
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
          {restaurant?.description && (
            <div className="description">
              {restaurant.description.split("\n").map((line, index) => (
                <div key={index}>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          )}
          <div className="info">
            {restaurant?.service.map((service) => (
              <img key={service.id} src={service.icon} alt={service.title} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RestaurantDetail;
