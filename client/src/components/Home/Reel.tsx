import {
  IconUser,
  IconHeart,
  IconHeartFilled,
  IconVolumeOff,
  IconVolume,
} from "@tabler/icons-react";
import { useFoodItem } from "../../hooks/useFoodItem";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useState, useEffect, useRef } from "react";

interface ReelProps {
  _id: string;
  description: string;
  video: string;
  foodPartner: {
    _id: string;
    name: string;
  };
  likes: string[];
  isActive: boolean | null;
}

export const Reel = ({
  _id,
  description,
  video,
  foodPartner,
  likes = [],
  isActive,
}: ReelProps) => {
  const { likeReel } = useFoodItem();
  const { user } = useUserAuth();
  const [muted, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  const isLiked = likes.includes(user?._id || "");

  return (
    <div className="h-full w-full relative flex justify-center items-center bg-black">
      <video
        ref={videoRef}
        muted={muted}
        loop
        playsInline
        src={video}
        className="h-full w-full object-contain bg-black"
      />

      <button onClick={() => setMuted(!muted)} className="absolute bottom-24 right-5">
        {muted ? (
          <IconVolumeOff
            size={32}
            className="bg-black bg-opacity-60 text-white rounded-full p-1"
          />
        ) : (
          <IconVolume
            size={32}
            className="bg-black bg-opacity-60 text-white rounded-full p-1"
          />
        )}
      </button>

      <div className="absolute bottom-30 left-5">
        <h4 className="text-white text-sm font-semibold flex items-center gap-2 pb-1">
          <IconUser size={20} className="bg-black p-0.5 rounded-full" />
          {foodPartner?.name}
        </h4>
        <p className="text-white text-sm pr-10">{description}</p>
      </div>

      {user && (
        <div className="absolute bottom-35 right-5 flex flex-col items-center">
          <button onClick={() => likeReel(_id)} className="text-white">
            {isLiked ? (
              <IconHeartFilled size={32} className="text-red-500" />
            ) : (
              <IconHeart size={32} color="red" />
            )}
          </button>
          <p className="text-white text-xs">{likes.length}</p>
        </div>
      )}
    </div>
  );
};
