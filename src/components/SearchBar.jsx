import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("query") || "";
  const page = searchParams.get("page");
  const genre = searchParams.get("genre") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);

  const debounceSearchInput = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (debounceSearchInput) {
      setSearchParams({ query: debounceSearchInput });
    } else if (debounceSearchInput == "") {
      const searchParamsObj = {};
      if (page && page != "null") {
        searchParamsObj.page = page;
      }
      if (genre && genre != "null") {
        searchParamsObj.genre = genre;
      }
      setSearchParams(searchParamsObj);
    }
  }, [debounceSearchInput]);

  return (
    <div className="relative w-full max-w-md mx-auto flex">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search your next movie/tv..."
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
      {searchInput && (
        <button
          onClick={() => {
            setSearchParams();
            setSearchInput("");
          }}
          className="px-4 py-3 absolute right-0 top-0 bottom-0 bg-purple-600 text-white font-semibold rounded-r-xl hover:bg-purple-700 transition-all duration-300 cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default SearchBar;
