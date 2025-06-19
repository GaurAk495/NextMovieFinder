import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
export const CastCard = ({ member }) => (
  <Link className="flex-shrink-0 w-40" to={`/people/${member.id}`}>
    <img
      src={
        member.profile_path
          ? `${IMAGE_BASE}${member.profile_path}`
          : "/no-poster.jpg"
      }
      alt={member.name}
      className="w-full h-60 object-cover rounded-lg shadow-md mb-2"
    />
    <h4 className="font-semibold text-sm">{member.name}</h4>
    <p className="text-zinc-400 text-sm">{member.character}</p>
  </Link>
);
