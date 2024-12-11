import { useNavigate, useParams } from "react-router-dom";
import { Restaurant } from "../../apiSlice";
import RestaurantImageSkeleton from "./RestaurantImageSkeleton";

interface RestaurantCardItemProps {
  restaurant: Restaurant;
}

const RestaurantCardItem = ({ restaurant }: RestaurantCardItemProps) => {
  const navigate = useNavigate();
  const { citySlug } = useParams<{ citySlug: string }>();
  return (
    <div className="restaurant-item">
      <div className="img">
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${citySlug}/restaurants/${restaurant.slug}`);
          }}
          className="cursor-pointer text-black"
          href={`/${citySlug}/restaurants/${restaurant.slug}`}
        >
          <RestaurantImageSkeleton
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
  );
};

export default RestaurantCardItem;
