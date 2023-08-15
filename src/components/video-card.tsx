import { Link } from "react-router-dom";
import { Video } from "../store/features/videoSlice";
import { Badge } from "./ui/badge";

const VideoCard = ({
  id,
  title,
  videoUrl,
  thumbnailUrl,
  videoType,
  creator,
}: Video) => {
  return (
    <Link to={`/video/${id}`}>
            <div className="rounded-xl cursor-pointer my-2 px-0 relative mx-2 text-white group overflow-hidden">
        <Badge variant={'destructive'} className="absolute left-2 top-2 group-hover:opacity-100 z-20">{videoType}</Badge>
      <img
        className="rounded-md transition-transform duration-300 group-hover:scale-105"
        src={thumbnailUrl}
        alt={title}
      />
      <div className="bg-black bg-opacity-20 p-4 w-full absolute -bottom-2 transition-opacity duration-300 group-hover:opacity-100 opacity-0">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-300 font-normal">{creator?.username}</p>
      </div>
    </div>
    </Link>

  );
};

export default VideoCard;
