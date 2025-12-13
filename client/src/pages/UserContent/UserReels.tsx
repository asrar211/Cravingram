import { useEffect, useRef, useState } from "react";
import { Reel } from "../../components/Home/Reel";
import { UserMenubar } from "../../components/Layout/UserMenubar";
import { useFoodItem } from "../../hooks/useFoodItem";

export const UserReels = () => {
  const { foodItems } = useFoodItem();
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      videoRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-[8vh]">
      {foodItems.map((item, index) => (
        <div
          key={item._id}
          className="snap-start h-screen"
          data-index={index}
          ref={(el) => { videoRefs.current[index] = el; }}
        >
          <Reel
            _id={item._id}
            description={item.description}
            video={item.videoUrl}
            foodPartner={item.foodPartner}
            likes={item.likes || []}
            isActive={activeIndex === index}
          />
        </div>
      ))}

      <UserMenubar />
    </div>
  );
};
