import { useState } from "react";

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="relative w-full h-[350px] sm:h-[300px] md:h-[350px] lg:h-[380px] bg-gray-300 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        </div>
      )}
      <img
        loading="lazy"
        className={`m-auto w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

export default ProductImage;
