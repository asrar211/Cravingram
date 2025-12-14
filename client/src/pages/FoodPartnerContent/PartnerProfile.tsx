import { IconHeartFilled, IconLogout, IconSoup, IconUser } from "@tabler/icons-react";
import { PartnerMenubar } from "../../components/Layout/PartnerMenubar"
import { useFoodPartnerAuth } from "../../hooks/useFoodPartnerAuth";
import { useNavigate } from "react-router-dom";
import { useFoodItem } from "../../hooks/useFoodItem";
import { useEffect, useState } from "react";
import type { FoodItem } from "../../types/FoodItem";
import { api } from "../../utils/api";

export const PartnerProfile = () => {
  const { foodPartner, logout } = useFoodPartnerAuth();
  const { getFoodItemsByPartner } = useFoodItem();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const navigate = useNavigate();

  const handleLogout =async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchFoodItems = async () => {
      const res: any = await getFoodItemsByPartner();
      setFoodItems(res);
      const { data } = await api.get("/food/partner/likes");
      setTotalLikes(data.totalLikes);
    };
    fetchFoodItems();
  }, []);


  return (
    <div className="max-w-xl mx-auto mt-5 px-5">
      <div className="flex justify-between">
        <h1 className="font-semibold">{foodPartner?.email}</h1>
        <div className="flex flex-col justify-center items-center gap-1">
          <IconLogout onClick={handleLogout} size={30} className="cursor-pointer"/>
          <p className="text-xs text-gray-500">Logout</p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-3">
        <IconUser size={70} className="p-2 bg-white/20 rounded-full"/>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">{foodPartner?.name}</h4>
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-sm font-semibold">{foodItems.length}</p>
            <p className="text-xs text-gray-500">Reels</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-sm font-semibold">{totalLikes}</p>
            <p className="text-xs text-gray-500">Likes</p>
          </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col justify-center items-center gap-1">
          <IconSoup className="cursor-pointer border-b-2"/>
        </div>
          </div>
        <div className="flex flex-wrap gap-[1.2px] mt-1 justify-center">
        {foodItems.map((item) => (
          <div key={item._id} className="relative">
            <video src={item.videoUrl} muted
            className="h-40 w-25 object-cover"/>
            <p className="text-xs absolute bottom-0 left-1 font-semibold flex gap-1 items-center">{item.likes.length} <IconHeartFilled size={10}/></p>
          </div>
        ))}
        
        </div>

        <PartnerMenubar />
    </div>
  )
}

