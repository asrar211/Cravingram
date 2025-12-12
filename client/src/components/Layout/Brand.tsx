import { IconSearch } from '@tabler/icons-react';

export const Brand = () => {
  return (
    <div className='bg-black flex text-white justify-between py-4 px-8 items-center fixed w-full max-w-xl top-0 left-1/2 -translate-x-1/2 z-50 gap-3'>
        <h1 className='text-xl'>Cravingram</h1>
        <div className='relative'>
            <input 
            type="text" 
            placeholder="Search"
            className='rounded-full bg-white/10 py-3 pr-3 px-10'
            />
            <IconSearch className='absolute top-1/2 left-2 -translate-y-1/2'/>
        </div>
    </div>
  )
}
