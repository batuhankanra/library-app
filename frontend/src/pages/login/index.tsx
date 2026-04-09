import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app_hook" 
import { login } from "../../store/features/auth/auth_slice"; 
import { useNavigate } from "react-router"; 

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, user } = useAppSelector(
    (state) => state.auth_slice
  );
  if (user){
    return navigate("/")
  }
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };
  console.log(user)

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Giriş Yap
        </h1>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Şifre</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white font-medium transition
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;