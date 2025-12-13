import { useState } from "react"
import { useUserAuth } from "../../hooks/useUserAuth";
import { Link, useNavigate } from "react-router-dom";
import { useFoodPartnerAuth } from "../../hooks/useFoodPartnerAuth";

export const UserSignup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signup, loading, error, success, user } = useUserAuth();
  const { foodPartner } = useFoodPartnerAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user || foodPartner ? (
        <div className="h-screen flex justify-center items-center text-sm text-gray-300 bg-gray-900">
          Already Logged in.
          <Link to="/" className="text-blue-400 underline ml-1">
            Go to HomePage
          </Link>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8">
            <h1 className="text-2xl font-semibold text-white text-center mb-6">
              Create Your Account
            </h1>

            {loading && (
              <div className="text-blue-400 text-sm mb-3 text-center">Loading...</div>
            )}
            {error && (
              <div className="text-red-400 text-sm mb-3 text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-400 text-sm mb-3 text-center">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />

              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg 
                font-medium text-sm hover:bg-blue-700 transition-all shadow-md"
              >
                Signup
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?
              <Link to="/user/login" className="text-blue-400 underline ml-1">
                Login here
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
