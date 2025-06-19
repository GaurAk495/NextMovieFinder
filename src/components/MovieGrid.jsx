import { CircularProgress } from "@mui/material";
import { getMovie } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import filterStore from "@/store/filterStore";
import NoMovieFound from "./QueryState/NoMovieFound";
import ErrorFallback from "./QueryState/Error";

function MovieGrid() {
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page") || "1";
  const genreId = searchParams.get("genre") || null;
  const query = searchParams.get("query") || "";

  const filter = filterStore((state) => state.filter);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", pageNum, query, genreId, filter],
    queryFn: () => getMovie(pageNum, query, genreId, filter),
    keepPreviousData: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });
  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (isError) {
    return <ErrorFallback error={error} onRetry={() => refetch()} />;
  }

  const { results: movies } = data.data;

  if (movies.length === 0) {
    return <NoMovieFound />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 order-2 md:order-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
