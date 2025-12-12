import { Brand } from "./Brand"
import { UserMenubar } from "./UserMenubar"

export const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Brand/>
    {children}
    <UserMenubar/>
    </>
  )
}
