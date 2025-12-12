import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { UserAuthProvider } from './context/UserAuthContext.tsx'
import { FoodPartnerAuthProvider } from './context/FoodPartnerAuthContext.tsx'

import { UserSignup } from './pages/Auth/UserSignup.tsx'
import { UserLogin } from './pages/Auth/UserLogin.tsx'
import { FoodPartnerSignup } from './pages/Auth/FoodPartnerSignup.tsx'
import { FoodPartnerLogin } from './pages/Auth/FoodPartnerLogin.tsx'
import { ChooseSignupType } from './pages/ChooseSignupType.tsx'
import { ChooseLoginType } from './pages/ChooseLoginType.tsx'
import { AddFood } from './pages/FoodPartnerContent/AddFood.tsx'
import { PartnerLayout } from './components/Layout/PartnerLayout.tsx'
import { FoodItemProvider } from './context/FoodItemContext.tsx'
import { PartnerReels } from './pages/FoodPartnerContent/PartnerReels.tsx'
import { UserReels } from './pages/UserContent/UserReels.tsx'
import { UserProfile } from './pages/UserContent/UserProfile.tsx'
import { PartnerProfile } from './pages/FoodPartnerContent/PartnerProfile.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/user/signup",
    element: <UserSignup/>
  },
  {
    path: "/user/login",
    element: <UserLogin/>
  },
    {
    path: "/food-partner/signup",
    element: <FoodPartnerSignup/>
  },
  {
    path: "/food-partner/login",
    element: <FoodPartnerLogin/>
  },
  {
    path: "/choose-signup-type",
    element: <ChooseSignupType/>
  },
  {
    path: "/choose-login-type",
    element: <ChooseLoginType/>
  },
  {
    path: "/food-partner/add-food",
    element: <PartnerLayout><AddFood/></PartnerLayout>
  },
  {
    path: "/reels",
    element: <PartnerReels/>
  },
  {
    path: "/user/reels",
    element: <UserReels/>
  },
  {
    path: "/profile",
    element: <PartnerProfile/>
  },
  {
    path: "/user/profile",
    element: <UserProfile/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserAuthProvider>
      <FoodPartnerAuthProvider>
     <FoodItemProvider>
       <RouterProvider router={router}/>
     </FoodItemProvider>
      </FoodPartnerAuthProvider>
    </UserAuthProvider>
  </StrictMode>,
)
