import { Brand } from "../../components/Layout/Brand"
import { PartnerMenubar } from "../../components/Layout/PartnerMenubar"
import { Post } from "../../components/Home/Post"
import { useFoodItem } from "../../hooks/useFoodItem"

export const FoodPartnerHome = () => {
  const { foodItems } = useFoodItem();
  return (
    <div className="relative overflow-y-scroll w-full no-scrollbar overflow-x-hidden max-w-xl mx-auto">

      {/* Brand*/}
      <Brand/>


      {/* Posts */}
      <div className="flex flex-col pt-20 pb-[8vh]">
      {foodItems?.map((item) => (
        <div key={item._id}>
        <Post
          _id={item._id}
          likes={item.likes}
          name={item.name}
          description={item.description}
          video={item.videoUrl}
          foodPartner={item.foodPartner}
          createdAt={item.createdAt?.toString() || ""}
        />  
        </div>
      ))}
      </div>

      {/* Menubar */}
        <PartnerMenubar/>
    </div>
  )
}
