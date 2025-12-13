import {
  IconBrandRumble,
  IconHome,
  IconTruckLoading,
  IconUserCircle,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const UserMenubar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl bg-black h-[8vh] z-50">
      <div className="h-full flex justify-around items-center">
        <Link to="/">
          <IconHome color="white" className="cursor-pointer" size={28} />
        </Link>

        <Link to="/user/reels">
          <IconBrandRumble color="white" className="cursor-pointer" size={28} />
        </Link>

        <IconTruckLoading color="white" className="cursor-pointer" size={28} />

        <Link to="/user/profile">
          <IconUserCircle color="white" className="cursor-pointer" size={28} />
        </Link>
      </div>
    </div>
  );
};
