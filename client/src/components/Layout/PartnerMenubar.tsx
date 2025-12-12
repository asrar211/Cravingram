import { IconBrandRumble, IconHome, IconPlus, IconTruckLoading, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const PartnerMenubar = () => {
  return (
    <div className="bg-black w-full h-[8vh] bottom-0 left-1/2 -translate-x-1/2 fixed max-w-xl mx-auto">
    <div className=" w-full h-full flex justify-around items-center">
       <Link to="/"><IconHome color='white' className='cursor-pointer'/></Link>
        <Link to='/reels'><IconBrandRumble color='white' className='cursor-pointer'/></Link>
        <Link to='/food-partner/add-food'><IconPlus color='white' className='cursor-pointer'/></Link>
        <IconTruckLoading color='white' className='cursor-pointer'/>
        <Link to='/profile'><IconUserCircle color='white' className='cursor-pointer'/></Link>
    </div>
    </div>
  )
}
