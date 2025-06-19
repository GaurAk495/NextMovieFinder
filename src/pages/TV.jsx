import React from "react";
import TVGrid from "@/components/TvExplorePage/TVGrid";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import GenreComponent from "@/components/GenreComponent";
import TrendingTVSection from "@/components/TvExplorePage/TrendingTVSection";

function TV() {
  return (
    <div className="hero-section min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="max-w-xl text-center w-full mx-auto align-middle">
          <h1 className="text-4xl font-bold mb-2">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-white/85 to-blue-700/75 bg-clip-text text-transparent text-shadow-yellow-600">
              Favorite
            </span>{" "}
            Tv Show
          </h1>
          <p className="text-lg">Search and explore movies from every genre</p>
        </header>

        {/* Hero Image + Search */}
        <section className="group max-w-lg w-full mx-auto focus-within:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all">
          <img
            src="/heroimage.png"
            alt="Hero Movie Poster"
            loading="lazy"
            decoding="async"
            className="mx-auto rounded-lg shadow-lg max-h-[400px] transition duration-300"
          />
          <SearchBar />
        </section>
        <TrendingTVSection />
        <section className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-10">
          <TVGrid />
          <GenreComponent />
        </section>

        <div className="mt-8">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default TV;
