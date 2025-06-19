import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

import ErrorFallback from "../QueryState/Error";
import { getMovieImagesById } from "@/api/movieApi";
import ImageRow from "../QueryState/Swiper/SwiperRow";
import { ImageOff } from "lucide-react";
import { getTVImagesById } from "@/api/tvApi";
const baseImageUrl = "https://image.tmdb.org/t/p/w500";

const MovieBackdropsGallery = () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const isMoviePage = pathname.startsWith("/movie") ? true : false;
  const queryKey = isMoviePage ? "movieImages" : "tvShowImages";
  const {
    data: movieImages,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [queryKey, id],
    queryFn: isMoviePage
      ? () => getMovieImagesById(id)
      : () => getTVImagesById(id),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="text-white bg-zinc-900 min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback error={error} onRetry={refetch} />;
  }

  const backdrops = movieImages?.data?.backdrops || [];
  const displayList = backdrops.map((img) => `${baseImageUrl}${img.file_path}`);
  const mid = Math.ceil(displayList.length / 2);
  const row1 = displayList.slice(0, mid);
  const row2 = displayList.slice(mid);

  return (
    <section className="mt-8 bg-black py-5">
      <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">
        Gallery
      </h3>
      <div className="overflow-hidden w-full">
        {displayList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-white py-16 opacity-50 gap-4">
            <ImageOff className="text-4xl text-gray-400" />
            <p className="text-lg font-medium">No Images Available</p>
          </div>
        ) : (
          <>
            {displayList.length < 4 ? (
              <ImageRow images={displayList} speed={2500} />
            ) : (
              <>
                <ImageRow images={row1} speed={2500} />
                <ImageRow images={row2} speed={3500} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MovieBackdropsGallery;
