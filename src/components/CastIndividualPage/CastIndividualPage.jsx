import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorFallback from "../QueryState/Error";
import { getPersonById } from "@/api/peopleApi";
import ImageSeciton from "./ImageSeciton";

function CastIndividualPage() {
  const id = useParams().id;
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["people", id],
    queryFn: () => getPersonById(id),
  });

  if (isLoading)
    return (
      <div className="text-white bg-zinc-900 min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  if (isError) {
    return <ErrorFallback error={error} onRetry={() => refetch()} />;
  }

  const people = data.data;

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate age
  const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && endDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Banner */}
      <div className="relative w-full h-[30vh] sm:h-[35vh] overflow-hidden">
        {people.profile_path && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl bg-no-repeat opacity-60 scale-105"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${people.profile_path})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#0a0a0f]" />
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 -mt-32 sm:-mt-36 pb-10">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative group">
              <img
                src={
                  people.profile_path
                    ? `https://image.tmdb.org/t/p/original${people.profile_path}`
                    : "/no-poster.jpg"
                }
                alt={people.name}
                className="w-full rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 text-white/90 space-y-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto pr-2">
            {/* Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              {people.name}
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Personal Info */}
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 ring-1 ring-white/10 text-sm sm:text-base">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white/90">
                  Personal Info
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60">Known For</p>
                    <p className="font-medium text-white/90">
                      {people.known_for_department || "Not Available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Gender</p>
                    <p className="font-medium text-white/90">
                      {people.gender === 1
                        ? "Female"
                        : people.gender === 2
                        ? "Male"
                        : "Not Specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Birthday</p>
                    <p className="font-medium text-white/90">
                      {formatDate(people.birthday)}
                      {calculateAge(people.birthday, people.deathday) &&
                        ` (${calculateAge(
                          people.birthday,
                          people.deathday
                        )} years old)`}
                    </p>
                  </div>
                  {people.deathday && (
                    <div>
                      <p className="text-white/60">Died</p>
                      <p className="font-medium text-white/90">
                        {formatDate(people.deathday)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-white/60">Place of Birth</p>
                    <p className="font-medium text-white/90">
                      {people.place_of_birth || "Not Available"}
                    </p>
                  </div>
                  {people.homepage && (
                    <div>
                      <p className="text-white/60">Official Site</p>
                      <a
                        href={people.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Biography */}
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 ring-1 ring-white/10 text-sm sm:text-base">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white/90">
                  Biography
                </h2>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {people.biography || "No biography available."}
                </p>
              </div>

              {/* Also Known As */}
              {people.also_known_as?.length > 0 && (
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 ring-1 ring-white/10 text-sm sm:text-base">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white/90">
                    Also Known As
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {people.also_known_as.map((name, index) => (
                      <div
                        key={index}
                        className="bg-white/10 p-2 rounded-lg text-white/80 hover:bg-white/15 transition-colors"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* image Section */}
      <ImageSeciton />
    </div>
  );
}

export default CastIndividualPage;
