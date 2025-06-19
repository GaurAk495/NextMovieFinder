import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function MoviePageFooter() {
  const [searchInput, setSearchInput] = useState("");
  const debounceSearchTerm = useDebounce(searchInput, 2000);
  const navigate = useNavigate();
  useEffect(() => {
    if (debounceSearchTerm) {
      navigate(`/?query=${debounceSearchTerm}`);
    }
  }, [debounceSearchTerm]);
  return (
    <footer className="bg-transparent/55 text-gray-300 px-6 py-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            🎥 NextMovieWatch
          </h1>
          <p className="text-sm text-gray-400">
            Your gateway to discover top trending movies. Powered by TMDB.
          </p>
        </div>

        {/* Search Section */}
        <div className="relative w-full max-w-md mx-auto flex flex-col">
          <h4 className="text-lg font-semibold text-white mb-3">
            Search Movies
          </h4>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search your next movie..."
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} NextMovieWatch. All rights reserved.
      </div>
    </footer>
  );
}

export default MoviePageFooter;
