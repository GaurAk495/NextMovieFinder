import React from "react";
import { Link } from "react-router-dom";

function TrendingTVTile({ tv, index }) {
  return (
    <Link
      className="min-w-[130px] flex-shrink-0 cursor-pointer relative group"
      to={`/tv/${tv.id}`}
    >
      {/* tv Poster */}
      <div className="rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
        <img
          src={
            tv.poster_path
              ? `https://image.tmdb.org/t/p/w300${tv.poster_path}`
              : "/no-poster.jpg"
          }
          alt={tv.title}
          loading="lazy"
          decoding="async"
          className="h-[180px] w-full object-cover"
        />

        {/* Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-2 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-xs text-white font-semibold truncate">
            {tv.title}
          </h3>
          <p className="text-[10px] text-gray-300">
            ⭐ {tv.vote_average.toFixed(1)}
          </p>
        </div>

        {/* Rank Badge */}
        <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10 shadow">
          #{index + 1}
        </span>
      </div>

      {/* Genre Tooltip on hover */}
      {tv.genres?.length > 0 && (
        <div className="absolute left-0 right-0 -bottom-[20px] w-max max-w-[150px] text-[10px] text-gray-400 bg-gray-800 px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
          {tv.genres.map((g) => g.name).join(", ")}
        </div>
      )}
    </Link>
  );
}

export default TrendingTVTile;
