const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
function HeroSection({ data }) {
  return (
    <div className="w-full h-[80vh] relative overflow-hidden rounded-xl shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-[position:center_top] transition-transform duration-500 scale-100 hover:scale-105 will-change-transform"
        style={{
          backgroundImage: data.backdrop_path
            ? `url(${IMAGE_BASE}${data.backdrop_path})`
            : `url("/no-backdrop-movie-poste.png")`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/40 to-transparent"></div>
    </div>
  );
}

export default HeroSection;
