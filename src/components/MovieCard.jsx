import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : "/no-poster.jpg"
          }
          alt={movie.title || "Movie Poster"}
          loading="lazy"
          decoding="async"
          className={`w-full h-72 object-cover rounded-xl shadow-md transition duration-300 ease-in-out ${
            movie.poster_path ? "hover:scale-105 hover:shadow-xl" : "opacity-70"
          }`}
          onError={(e) => {
            e.currentTarget.src = "/no-poster.jpg";
          }}
        />
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">{movie.overview}</p>
          <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
            {movie.vote_average && (
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
            )}
            <span>{movie.release_date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
