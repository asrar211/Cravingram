import { useState } from "react"
import { useUserAuth } from "../../hooks/useUserAuth";
import { Link, useNavigate } from "react-router-dom";
import { useFoodPartnerAuth } from "../../hooks/useFoodPartnerAuth";

export const UserSignup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {signup, loading, error, success, user} = useUserAuth();
  const { foodPartner } = useFoodPartnerAuth();
  const navigate = useNavigate();
  
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <>
    {user || foodPartner ? (
      <div className="text-sm h-screen flex justify-center items-center">Already Logged in. <Link to="/" className="text-blue-800">   Go to HomePage</Link></div>
    ): (
      <div>
        <form onSubmit={handleSubmit}>
          {loading && <div>loading...</div>}
          {error && <div>{error}</div>}
          {success && <div>{success}</div>}
            <input 
            type="text" 
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input 
            type="email" 
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
        </form>
    </div>
    )}
    </>
  )
}
