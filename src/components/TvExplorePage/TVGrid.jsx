import { CircularProgress } from "@mui/material";
import { getTV } from "../../api/tvApi";
import TVCard from "./TVCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import filterStore from "@/store/filterStore";
import NoMovieFound from "../QueryState/NoMovieFound";
import ErrorFallback from "../QueryState/Error";

function TVGrid() {
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page") || "1";
  const genreId = searchParams.get("genre") || null;
  const query = searchParams.get("query") || "";

  const filter = filterStore((state) => state.filter);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tvshows", pageNum, query, genreId, filter],
    queryFn: () => getTV(pageNum, query, genreId, filter),
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

  const { results: shows } = data.data;

  if (shows.length === 0) {
    return <NoMovieFound />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 order-2 md:order-1">
      {shows.map((show) => (
        <TVCard key={show.id} show={show} />
      ))}
    </div>
  );
}

export default TVGrid;
