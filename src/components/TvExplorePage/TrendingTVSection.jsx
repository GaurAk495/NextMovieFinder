import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { getTVById } from "@/api/tvApi";
import TrendingTVTile from "./TrendingTVTile";
import { readTV } from "@/dao/readData";

function TrendingTVSection() {
  const { data: tvListData, isLoading: tvListDataLoading } = useQuery({
    queryKey: ["trendingTVShowList"],
    queryFn: readTV,
    refetchOnMount: false,
    gcTime: 1000 * 60 * 5,
    staleTime: "static",
  });

  const tvShowIds = tvListData?.map((item) => item.tvId) || "";
  const top10 = tvShowIds.slice(0, 10);

  const fetchAllTVDetails = async () => {
    try {
      const responses = await Promise.all(top10.map((id) => getTVById(id)));
      return responses.map((res) => res.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return [];
    }
  };

  if (tvListDataLoading) {
    <div className="w-full flex justify-center items-center">
      <CircularProgress />
    </div>;
  }
  const { data: trendingTVData, isLoading: trendingTVDataLoading } = useQuery({
    queryKey: ["trending-TV-all-details", top10],
    queryFn: fetchAllTVDetails,
    enabled: !!tvListData,
    keepPreviousData: true,
  });

  if (tvListDataLoading || trendingTVDataLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
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
        TV
      </h2>

      <div className="flex gap-4 py-10 overflow-x-scroll scroll-smooth">
        {trendingTVData.slice(0, 10).map((tv, index) => (
          <TrendingTVTile key={tv.id} tv={tv} index={index} />
        ))}
      </div>
    </section>
  );
}

export default TrendingTVSection;
