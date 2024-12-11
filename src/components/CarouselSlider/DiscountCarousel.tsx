import { useGetImagesQuery } from "../../apiSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DiscountPrevArrow from "./DiscountPrevArrow";
import DiscountNextArrow from "./DiscountNextArrow";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const DiscountCarousel = () => {
  const { data = [], isLoading } = useGetImagesQuery();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    prevArrow: <DiscountPrevArrow className="" onClick={() => {}} />,
    nextArrow: <DiscountNextArrow className="" onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <section className="discount-section cursor-pointer mt-20">
      <Slider {...settings}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-[150px] sm:h-[200px] md:h-[300px] lg:h-[380px]" width="100%" />
              </div>
            ))
          : data.map((item, index) => (
              <div key={index}>
                {loadedImages.includes(index) ? (
                  <img
                    src={item.image}
                    alt={`Discount ${index}`}
                    className="h-[150px] sm:h-[200px] md:h-[300px] lg:h-[380px] w-full"
                  />
                ) : (
                  <Skeleton className="h-[150px] sm:h-[200px] md:h-[300px] lg:h-[380px]" width="100%" />
                )}
                <img
                  src={item.image}
                  alt={`Discount ${index}`}
                  style={{ display: "none" }}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            ))}
      </Slider>
    </section>
  );
};

export default DiscountCarousel;
