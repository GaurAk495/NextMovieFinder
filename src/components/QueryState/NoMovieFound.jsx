import { SearchSlash } from "lucide-react";

function NoMovieFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-400">
      <SearchSlash className="w-16 h-16 mb-4 text-zinc-600" />
      <h2 className="text-xl font-semibold mb-2">No movies found</h2>
      <p className="text-sm text-zinc-500">
        Try searching something else or check back later.
      </p>
    </div>
  );
}

export default NoMovieFound;
