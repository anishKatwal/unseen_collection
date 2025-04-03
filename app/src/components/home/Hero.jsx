import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { MENU_ITEMS_ROUTE } from "../../constants/routes";
import { Swiper, SwiperSlide } from "swiper/react";
import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero2.png";
import hero3 from "../../assets/images/hero3.png";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Chicken Pizza",
    price: 999,
    misc: "with extra cheese",
    image: hero1,
    query: "pizza",
  },
  {
    title: "Hamburger",
    price: 599,
    misc: "with fries",
    image: hero2,
    query: "burger",
  },
  {
    title: "Steamed Momos",
    price: 459,
    misc: "with our famous pickle",
    image: hero3,
    query: "momo",
  },
];

function Hero() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full lg:h-svh"
              />
              <div className="h-full w-full bg-black absolute opacity-50"></div>
              <div className="flex flex-col items-start justify-center absolute top-1/5 left-1/5">
                <span className="bg-slate-800 px-3 rounded-xl md:text-xs text-[0.5rem] ml-1 py-1 uppercase text-white">
                  {slide.misc}
                </span>
                <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white md:mt-3">
                  {slide.title}
                </h1>
                <h4 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 my-1 md:my-3">
                  <span className="text-3xl md:text-4xl lg:text-6xl">$</span>
                  {slide.price}
                </h4>
                <Link
                  to={`${MENU_ITEMS_ROUTE}?item-name=${slide.query}`}
                  className="py-1 px-4 md:py-2 md:px-6 text-xs md:text-lg bg-zinc-900 text-white font-semibold hover:bg-zinc-800"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
