import { Restaurant } from "../../apiSlice";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
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
      {restaurant.description && (
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
  );
};

export default RestaurantInfo;
