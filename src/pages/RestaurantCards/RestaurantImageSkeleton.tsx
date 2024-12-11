import { useState } from "react";

interface RestaurantImageSkeletonProps {
  src: string;
  alt: string;
}

const RestaurantImageSkeleton = ({
  src,
  alt,
}: RestaurantImageSkeletonProps) => {
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

export default RestaurantImageSkeleton;
