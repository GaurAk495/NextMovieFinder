import {
  Star,
  Play,
  DollarSign,
  Calendar,
  Clock,
  Film,
  Users,
  Video,
} from "lucide-react";
import { CastCard } from "@/components/MoviePage/CastCard";
import { VideoCard } from "@/components/MoviePage/VideoCard";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function MainContent({ data }) {
  const director = data.credits.crew.find(
    (person) => person.job === "Director"
  );
  const trailers = data.videos.results.filter(
    (video) => video.type === "Trailer"
  );
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-56 relative z-10">
      <div className="flex gap-6 flex-wrap lg:flex-nowrap mb-12">
        {/* Poster */}
        <div className="w-full lg:w-auto">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            />
            <img
              src={
                data.poster_path
                  ? `${IMAGE_BASE}${data.poster_path}`
                  : "/no-poster.jpg"
              }
              alt={data.title}
              loading="lazy"
              decoding="async"
              className="rounded-xl shadow-2xl w-full lg:w-80 h-auto object-cover"
            />
          </picture>
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
          <p className="text-lg text-zinc-400 italic mb-4">{data.tagline}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-red-600 rounded-full text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-semibold">
                  {data.vote_average.toFixed(1)}/10
                </div>
                <div className="text-sm text-zinc-400">
                  {data.vote_count} votes
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold">
                  {new Date(data.release_date).getFullYear()}
                </div>
                <div className="text-sm text-zinc-400">Release Year</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-semibold">{data.runtime} min</div>
                <div className="text-sm text-zinc-400">Runtime</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-semibold">
                  {data.budget
                    ? `$${(data.budget / 1000000).toFixed(1)}M`
                    : "N/A"}
                </div>
                <div className="text-sm text-zinc-400">Budget</div>
              </div>
            </div>
          </div>

          <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
            {data.overview}
          </p>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {director && (
              <div>
                <span className="text-zinc-400">Director:</span>{" "}
                <span className="font-semibold">{director.name}</span>
              </div>
            )}
            {data.production_companies.length > 0 && (
              <div>
                <span className="text-zinc-400">Studio:</span>{" "}
                <span className="font-semibold">
                  {data.production_companies[0].name}
                </span>
              </div>
            )}
            {data.production_countries.length > 0 && (
              <div>
                <span className="text-zinc-400">Country:</span>{" "}
                <span className="font-semibold">
                  {data.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </span>
              </div>
            )}
            {data.status && (
              <div>
                <span className="text-zinc-400">Status:</span>{" "}
                <span className="font-semibold">{data.status}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-colors"
              >
                <Film className="w-5 h-5" />
                Official Site
              </a>
            )}
            {trailers.length > 0 && (
              <a
                href={`https://www.youtube.com/watch?v=${trailers[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-full font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {data.credits.cast.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Cast</h2>
          </div>
          <div className="overflow-x-auto">
            <div
              className="flex gap-4 pb-4 w-full overflow-y-hidden  py-10 
            [scrollbar-width:thin] 
            [scrollbar-color:rgba(255,255,255,0.3)_transparent] 
            [&::-webkit-scrollbar]:w-1 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-white/30 
            [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {data.credits.cast.slice(0, 10).map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {data.videos.results.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Videos</h2>
          </div>
          <div className="overflow-x-auto">
            <div
              className="flex gap-4 pb-4 w-full overflow-y-hidden  py-10 
            [scrollbar-width:thin] 
            [scrollbar-color:rgba(255,255,255,0.3)_transparent] 
            [&::-webkit-scrollbar]:w-1 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-white/30 
            [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {data.videos.results.slice(0, 5).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default MainContent;
