import { IconHeart, IconHeartFilled, IconUser, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { useFoodItem } from "../../hooks/useFoodItem";
import { useUserAuth } from "../../hooks/useUserAuth";

interface PostProps {
  _id: string;
  name: string;
  description: string;
  video: string;
  foodPartner: {
    _id: string;
    name: string;
  };
  createdAt: string;
  likes: string[];
}

export const Post = ({ _id, name, description, video, foodPartner, createdAt, likes = [] }: PostProps) => {
    const { likeReel } = useFoodItem();
    const { user } = useUserAuth();
    const [muted, setMuted] = useState(true);
  
    const isLiked = likes.includes(user?._id || "");
  
    const handleLike = async () => {
      await likeReel(_id);
    };

  return (
    <div className="flex flex-col pt-5 px-2 max-w-xl relative">

      {/* Header */}
      <div className="flex gap-2 pb-2 items-center">
        <IconUser color="white" className="bg-white/20 rounded-full p-1" />
        <h4 className="font-semibold text-sm">{foodPartner.name}</h4>
      </div>

      {/* Instagram-style video container */}
      <div className="relative w-full max-h-[80vh] overflow-hidden flex justify-center">
        <video
          src={video}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-auto rounded-md object-cover"
        />
        {/* Unmute Button */}
      {muted ? (
        <button
          onClick={() => setMuted(false)}
          className="absolute bottom-0 right-0 bg-opacity-50 text-white px-2 py-1 rounded-md text-sm"
        >
        <IconVolumeOff size={25} className="bg-black rounded-full p-1"/>
        </button>
      ): (
        <button
          onClick={() => setMuted(true)}
          className="absolute bottom-0 right-0 bg-opacity-50 text-white px-2 py-1 rounded-md text-sm"
        >
        <IconVolume size={25} className="bg-black rounded-full p-1"/>
        </button>
      )}
      </div>

      {user && (
      <div className="flex flex-col justify-center mt-1 pl-3">
        <p className="text-white text-xs">{likes.length} Likes</p>
        <button onClick={handleLike} className="text-white">
          {isLiked ? (
            <IconHeartFilled size={30} color="white" />
          ) : (
            <IconHeart size={30} color="white"/>
          )}
        </button>
      </div>
      )}


      {/* Text */}
      <div className="flex flex-col gap-1 pl-3 mt-2">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm">{description}</p>
        <p className="text-xs text-gray-500">{timeAgo(createdAt)}</p>
      </div>
    </div>
  );
};
