import { useGetImagesQuery } from "../apiSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DiscountPrevArrow from "./DiscountPrevArrow";
import DiscountNextArrow from "./DiscountNextArrow";

const DiscountCarousel = () => {
  const { data = [] } = useGetImagesQuery();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
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

  return (
    <section className="discount-section cursor-pointer pt-20">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index}>
            <img src={item.image} style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default DiscountCarousel;
