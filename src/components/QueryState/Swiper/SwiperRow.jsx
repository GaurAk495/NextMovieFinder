import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SwiperRow = ({ slidesPerView = "auto", speed, children }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={slidesPerView}
      autoplay={{
        delay: 1,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      speed={speed}
      allowTouchMove={true}
    >
      {children}
    </Swiper>
  );
};

const ImageRow = ({ images, speed }) => (
  <SwiperRow speed={speed}>
    {images.map((image, index) => (
      <SwiperSlide key={index} className="!w-auto p-4">
        <img
          src={image}
          alt="Backdrop"
          loading="lazy"
          decoding="async"
          onClick={() => window.open(image, "_blank")}
          className="grayscale block hover:grayscale-0 hover:[filter:drop-shadow(0_0_5px_rgba(241,68,84,10))_drop-shadow(0_0_10px_rgba(241,68,84,10))] rounded-[10px] duration-300 transition-all"
        />
      </SwiperSlide>
    ))}
  </SwiperRow>
);

export default ImageRow;
