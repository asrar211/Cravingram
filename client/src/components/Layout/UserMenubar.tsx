import { IconBrandRumble, IconHome, IconTruckLoading, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const UserMenubar = () => {
  return (
    <div className="bg-black w-full h-[8vh] bottom-0 left-1/2 -translate-x-1/2 fixed max-w-xl mx-auto">
    <div className=" w-full h-full flex justify-around items-center">
       <Link to="/"><IconHome color='white' className='cursor-pointer'/></Link>
        <Link to='/user/reels'><IconBrandRumble color='white' className='cursor-pointer'/></Link>
        <IconTruckLoading color='white' className='cursor-pointer'/>
        <Link to='/user/profile'><IconUserCircle color='white' className='cursor-pointer'/></Link>
    </div>
    </div>
  )
}
