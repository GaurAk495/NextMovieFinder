import { getMovieById } from "@/api/movieApi";
import { readMovies } from "@/dao/readData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TrendingMovieTile from "./trendingMovieTile";
import { CircularProgress } from "@mui/material";
import ErrorFallback from "./QueryState/Error";

function TrendingSection() {
  const { data: moveiListData, isLoading: moveiListDataLoading } = useQuery({
    queryKey: ["trendingList"],
    queryFn: readMovies,
    refetchOnMount: false,
    gcTime: 1000 * 60 * 5,
    staleTime: "static",
  });

  const movieIds = moveiListData?.map((item) => item.movieId) || "";
  const top10 = movieIds.slice(0, 10);

  const fetchAllMovieDetails = async () => {
    try {
      const responses = await Promise.all(top10.map((id) => getMovieById(id)));
      return responses.map((res) => res.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return [];
    }
  };

  const { data: trendingMovieData, isLoading: trendingMovieDataLoading } =
    useQuery({
      queryKey: ["trending-movies-all-details", top10],
      queryFn: fetchAllMovieDetails,
      enabled: !!moveiListData,
      keepPreviousData: true,
    });

  if (moveiListDataLoading || trendingMovieDataLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback error={error} onRetry={() => refetch()} />;
  }

  return (
    <section className="py-6 px-4 mt-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
        Top 10{" "}
        <span className="relative bg-gradient-to-r from-red-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,0,0,0.7)]">
          TrendIng
          <span className="absolute -top-3 right-8 text-sm text-white px-2 py-[2px] rounded-full shadow-md animate-pulse">
            🔥
          </span>
        </span>{" "}
        Movies
      </h2>

      <div className="flex gap-4 py-10 overflow-x-scroll scroll-smooth">
        {trendingMovieData?.slice(0, 10).map((movie, index) => (
          <TrendingMovieTile key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;
