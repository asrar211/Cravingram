import { Reel } from '../../components/Home/Reel';
import { UserMenubar } from '../../components/Layout/UserMenubar';
import { useFoodItem } from '../../hooks/useFoodItem';

export const UserReels = () => {
  const { foodItems } = useFoodItem();

  return (
    <div className="max-w-xl mx-auto h-screen overflow-y-scroll snap-y snap-mandatory mb-16 no-scrollbar">
      {foodItems.map((item) => (
        <div key={item._id} className="snap-start">
        <Reel
          key={item._id}
          _id={item._id}                        
          description={item.description}
          video={item.videoUrl}
          foodPartner={item.foodPartner}
          likes={item.likes || []}             
        />
        </div>
      ))}

      <UserMenubar />
    </div>
  );
};
