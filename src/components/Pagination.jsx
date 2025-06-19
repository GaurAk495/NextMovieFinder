import { getMovie } from "@/api/movieApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import filterStore from "@/store/filterStore";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PaginationComp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;
  const queryKey = pathname === "/" ? "movies" : "tvshows";
  const page = searchParams.get("page") || "1";
  const genre = searchParams.get("genre");
  const query = searchParams.get("query") || "";
  const filterState = filterStore((state) => state.filter);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, page, query, genre, filterState],
    queryFn: () => getMovie(page, query, genre, filterState),
    keepPreviousData: true,
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

  if (isError) return;

  let { total_pages, results } = data.data;
  total_pages = total_pages < 500 ? total_pages : 500;
  if (results.length == 0) {
    return;
  }

  const handleOnPagination = (pageNo) => {
    const searchParamsObj = { page: pageNo };
    if (query && query != "null") {
      searchParamsObj.query = query;
    }
    if (genre && genre != "null") {
      searchParamsObj.genre = genre;
    }
    setSearchParams(searchParamsObj);
  };

  const currentPage = Number(page);
  const getPageNumbers = () => {
    if (isMobile) {
      // Show only 3 pages on mobile: current, previous, and next
      const mobilePages = [];
      if (currentPage > 1) mobilePages.push(currentPage - 1);
      mobilePages.push(currentPage);
      if (currentPage < total_pages) mobilePages.push(currentPage + 1);
      return mobilePages;
    } else {
      // Desktop view: show up to 10 pages
      const start = Math.max(currentPage - 5, 1);
      return Array.from(
        { length: Math.min(10, total_pages - start + 1) },
        (_, i) => start + i
      );
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-10">
      <PaginationContent className="flex flex-wrap gap-2 justify-center">
        {/* previous page */}
        <PaginationItem>
          <button
            disabled={currentPage == 1}
            onClick={() => handleOnPagination(currentPage - 1)}
            className="px-3 py-2 sm:px-4 rounded-md border text-sm font-medium transition-colors duration-200 bg-transparent text-white border-gray-600 hover:bg-gray-800 cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed min-w-[80px] sm:min-w-[100px]"
          >
            Previous
          </button>
        </PaginationItem>

        {/* page numbers */}
        {!isMobile && currentPage > 6 && (
          <>
            <PaginationItem>
              <button
                onClick={() => handleOnPagination(1)}
                className="px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-200 bg-transparent text-white border-gray-600 hover:bg-gray-800"
              >
                1
              </button>
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 text-white">...</span>
            </PaginationItem>
          </>
        )}

        {pageNumbers.map((pNo) => {
          const isActive = currentPage == pNo;
          return (
            <PaginationItem key={pNo}>
              <button
                onClick={() => handleOnPagination(pNo)}
                className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-200 cursor-pointer min-w-[40px] ${
                  isActive
                    ? "bg-white text-black border-black"
                    : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
                }`}
              >
                {pNo}
              </button>
            </PaginationItem>
          );
        })}

        {!isMobile && currentPage < total_pages - 5 && (
          <>
            <PaginationItem>
              <span className="px-2 text-white">...</span>
            </PaginationItem>
            <PaginationItem>
              <button
                onClick={() => handleOnPagination(total_pages)}
                className="px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-200 bg-transparent text-white border-gray-600 hover:bg-gray-800"
              >
                {total_pages}
              </button>
            </PaginationItem>
          </>
        )}

        {/* next page */}
        <PaginationItem>
          <button
            disabled={total_pages == currentPage}
            onClick={() => handleOnPagination(currentPage + 1)}
            className="px-3 py-2 sm:px-4 rounded-md border text-sm font-medium transition-colors duration-200 bg-transparent text-white border-gray-600 hover:bg-gray-800 cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed min-w-[80px] sm:min-w-[100px]"
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComp;
