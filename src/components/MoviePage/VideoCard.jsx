export const VideoCard = ({ video }) => (
  <div className="flex-shrink-0 w-80">
    <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-lg mb-2">
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        title={video.name}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
      />
    </div>
    <h4 className="font-semibold text-sm truncate">{video.name}</h4>
  </div>
);
