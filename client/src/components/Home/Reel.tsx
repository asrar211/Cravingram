import { IconUser, IconHeart, IconHeartFilled, IconVolumeOff, IconVolume } from "@tabler/icons-react";
import { useFoodItem } from "../../hooks/useFoodItem";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useState } from "react";

interface ReelProps {
  _id: string;
  description: string;
  video: string;
  foodPartner: {
    _id: string;
    name: string;
  };
  likes: string[];
}

export const Reel = ({ _id, description, video, foodPartner, likes = [] }: ReelProps) => {
  const { likeReel } = useFoodItem();
  const { user } = useUserAuth();
  const [muted, setMuted] = useState(true);

  const isLiked = likes.includes(user?._id || "");

  const handleLike = async () => {
    await likeReel(_id);
  };

  return (
    <div className="h-[92vh] w-full flex justify-center items-center relative">
      
      <video
        autoPlay
        muted={muted}
        loop
        playsInline
        src={video}
        className="w-full max-h-[92vh] object-cover"
      />
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

      <div className="absolute bottom-0 left-5">
        <h4 className="text-white text-sm font-semibold flex items-center gap-2 pb-1">
          <IconUser size={20} className="p-0.5 bg-black rounded-full" />
          {foodPartner.name}
        </h4>
        <p className="text-white text-sm pr-10">{description}</p>
      </div>

      {user && (
      <div className="absolute bottom-35 right-5 flex flex-col items-center">
        <button onClick={handleLike} className="text-white">
          {isLiked ? (
            <IconHeartFilled size={30} className="text-red-500" />
          ) : (
            <IconHeart size={30} color="red"/>
          )}
        </button>
        <p className="text-red-900 text-xs">{likes.length}</p>
      </div>
      )}
      

    </div>
  );
};
