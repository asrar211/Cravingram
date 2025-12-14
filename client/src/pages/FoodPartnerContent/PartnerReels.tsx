import { Reel } from "../../components/Home/Reel";
import { PartnerMenubar } from "../../components/Layout/PartnerMenubar";
import { useFoodItem } from "../../hooks/useFoodItem";

export const PartnerReels = () => {
  const { foodItems } = useFoodItem();

  return (
    <div className="max-w-xl mx-auto h-screen overflow-y-scroll snap-y snap-mandatory mb-[8vh] no-scrollbar">
      {foodItems.map((item) => (
        <div key={item._id} className="snap-start h-full">
          <Reel
            _id={item._id}
            description={item.description}
            video={item.videoUrl}
            foodPartner={item.foodPartner}
            likes={item.likes || []}
            isActive={null}
          />
        </div>
      ))}

      <PartnerMenubar />
    </div>
  );
};
