import { IconLogout, IconUser } from "@tabler/icons-react";
import { UserMenubar } from "../../components/Layout/UserMenubar"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from "react-router-dom"

export const UserProfile = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout =async () => {
    await logout();
    navigate('/');
  }
  return (
    <div className="max-w-xl mx-auto mt-5 px-5">
      <h1 className="font-semibold">{user?.email}</h1>
      
      <div className="flex gap-3 mt-3">
        <IconUser size={70} className="p-2 bg-white/20 rounded-full"/>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">{user?.name}</h4>
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-sm font-semibold">6</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-sm font-semibold">6</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col justify-center items-center gap-1">
          <IconLogout onClick={handleLogout} size={30} className="cursor-pointer"/>
          <p className="text-xs text-gray-500">Logout</p>
        </div>

      </div>
        <UserMenubar />
    </div>
  )
}
