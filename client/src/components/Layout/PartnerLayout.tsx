import { Brand } from "./Brand"
import { PartnerMenubar } from "./PartnerMenubar"

export const PartnerLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Brand/>
    {children}
    <PartnerMenubar/>
    </>
  )
}
