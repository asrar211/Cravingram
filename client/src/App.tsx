import './App.css'
import { useUserAuth } from './hooks/useUserAuth'
import { UserHome } from './pages/UserContent/UserHome';
import { FoodPartnerHome } from './pages/FoodPartnerContent/FoodPartnerHome';
import { useFoodPartnerAuth } from './hooks/useFoodPartnerAuth';
import { ChooseLoginType } from './pages/ChooseLoginType';

function App() {
  const { user, loading } = useUserAuth();
  const { foodPartner } = useFoodPartnerAuth();

  if (loading) return <div>Loading...</div>;

  if (user) return <UserHome />;
  if (foodPartner) return <FoodPartnerHome />;

  return <ChooseLoginType />;
}

export default App
