import { Button } from "./ui/button";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { allGenre } from "@/api/movieApi";
import { useQuery } from "@tanstack/react-query";
import filterStore from "@/store/filterStore.js";
import { Separator } from "@/components/ui/separator";
import { allTVGenre } from "@/api/tvApi";

function GenreComponent() {
  const filterSwitch = filterStore((state) => state.switch);
  const filterState = filterStore((state) => state.filter);

  const location = useLocation();
  const pathname = location.pathname;
  const queryKey = pathname === "/" ? "moviesGen" : "tvshowsGen";

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: pathname === "/" ? allGenre : allTVGenre,
    staleTime: "static",
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { genres } = data.data;
  return (
    <div className="p-4 rounded-xl md:sticky md:h-fit top-20 order-1 md:order-2 shadow-2xl inset-shadow-black bg-gradient-to-bl from-red-800/10 to-purple-500/25">
      <h2 className="text-xl font-semibold mb-4 text-white">Filter by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant="outline"
            className="grow text-center bg-purple-900/20 hover:bg-primary hover:text-white transition-all cursor-pointer"
            asChild
          >
            <Link
              to={
                pathname === "/"
                  ? `/?genre=${genre.id}`
                  : `/tv?genre=${genre.id}`
              }
            >
              {genre.name}
            </Link>
          </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <Button
        className="bg-purple-900/20 hover:bg-primary hover:text-white transition-all cursor-pointer outline mx-auto block border-[1px]"
        onClick={filterSwitch}
      >
        Filter <span>{filterState ? "On" : "Off"}</span>
      </Button>
    </div>
  );
}

export default GenreComponent;
