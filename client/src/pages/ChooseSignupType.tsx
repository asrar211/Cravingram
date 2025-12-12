import { Link } from "react-router-dom";

export const ChooseSignupType = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <Link to='/user/signup'>
          <button 
          className="border border-neutral-500 hover:text-neutral-800 p-1 rounded-md text-sm hover:scale-101 hover:bg-neutral-100 text-white cursor-pointer transition-all duration-300 ease-in-out">Signup as User
          </button>
        </Link>
        <Link to='/food-partner/signup'>
          <button 
          className="border border-neutral-500 hover:text-neutral-800 p-1 rounded-md text-sm hover:scale-101 hover:bg-neutral-100 text-white cursor-pointer transition-all duration-300 ease-in-out">Signup as Food Partner
          </button>
        </Link>
        <p className="text-sm">Already have an Account? <Link className="text-yellow-100" to='/choose-login-type'>Login here</Link></p>
    </div>
  )
}
