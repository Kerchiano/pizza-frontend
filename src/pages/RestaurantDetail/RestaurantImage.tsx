interface RestaurantImageProps {
  isImageLoaded: boolean;
  image_detail: string;
  address: string;
  handleImageLoad: () => void;
}

const RestaurantImage = ({
  isImageLoaded,
  image_detail,
  address,
  handleImageLoad,
}: RestaurantImageProps) => {
  return (
    <section className="restaurant-img-section relative">
      {!isImageLoaded && (
        <div className="absolute inset-0 h-[650px] bg-gray-300 animate-pulse"></div>
      )}
      <img
        src={image_detail}
        alt={address}
        className={`transition-opacity duration-300 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
      />
    </section>
  );
};

export default RestaurantImage;
