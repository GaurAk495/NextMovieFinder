import MovieBackdropsGallery from "@/components/MoviePage/MovieImageSection";
import HeroSection from "@/components/MoviePage/HeroSection";
import MainContent from "@/components/MoviePage/MainContent";
import MoviePageFooter from "@/components/MoviePage/MoviePageFooter";
import ErrorFallback from "@/components/QueryState/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTVById } from "@/api/tvApi";

function TvShowPage() {
  const id = useParams().id;
  const {
    data: movieInfo,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["TvShowPage", id],
    queryFn: () => getTVById(id),
    keepPreviousData: true,
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

  const { data } = movieInfo;
  return (
    <div className="text-white bg-zinc-900">
      <div className="min-h-screen">
        <HeroSection data={data} />
        <MainContent data={data} />
      </div>

      <MovieBackdropsGallery />
      <MoviePageFooter />
    </div>
  );
}

export default TvShowPage;
