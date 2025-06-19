import { getPersonImages } from "@/api/peopleApi";
import { CircularProgress } from "@mui/material";
import React from "react";
import ErrorFallback from "../QueryState/Error";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ImageSeciton() {
  const id = useParams().id;
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["peopleImage", id],
    queryFn: () => getPersonImages(id),
  });

  if (isLoading)
    return (
      <div className="text-white bg-zinc-900 min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  if (isError) {
    return <ErrorFallback error={error} onRetry={() => refetch()} />;
  }

  const Images = data.data.profiles || [];

  return (
    <div className="py-8 px-4 bg-zinc-900">
      <h2 className="text-white text-2xl font-bold mb-6">Gallery</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {Images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt={`Profile Image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSeciton;
