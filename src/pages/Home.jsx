import SearchBar from "../components/SearchBar";
import PaginationComp from "../components/Pagination";
import GenreComponent from "../components/GenreComponent";
import MovieGrid from "@/components/MovieGrid";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  return (
    <div className="hero-section min-h-screen bg-cover bg-center text-white px-4 py-10 scroll-smooth">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Heading */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-white/85 to-blue-700/75 bg-clip-text text-transparent text-shadow-yellow-600">
              Favorite
            </span>{" "}
            Movie
          </h1>
          <p className="text-lg">Search and explore movies from every genre</p>
        </header>

        {/* Hero Image + Search */}
        <section className="group max-w-lg w-full mx-auto mb-10 focus-within:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition duration-300">
          <img
            src="/heroimage.png"
            alt="Hero Movie Poster"
            loading="lazy"
            decoding="async"
            className="mx-auto rounded-lg shadow-lg max-h-[400px] transition duration-300"
          />
          <SearchBar />
        </section>

        {/* Trending Movies */}
        <section className="mb-10">
          <TrendingSection />
        </section>

        {/* Movie Grid + Genre Filter */}
        <section className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-6 mb-10">
          <MovieGrid />
          <GenreComponent />
        </section>

        {/* Pagination */}
        <section>
          <PaginationComp />
        </section>
      </div>
    </div>
  );
}
