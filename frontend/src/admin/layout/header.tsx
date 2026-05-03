import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../store/app_hook";

const AdminHeader = () => {
  const { user ,isLoading} = useAppSelector((state) => state.auth_slice);
  const navigate = useNavigate();

  useEffect(() => {
   if(!isLoading){
     if (!user) {
      navigate("/", { replace: true });
      return;
    }

    if (user.role !== "admin") {
      navigate("/", { replace: true });
    }
   }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <header className="bg-gray-900 text-white border-b px-6 py-3 flex justify-between items-center">
      
      <div className="text-sm text-gray-300">
        Admin Panel
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <span className="text-sm">{user.name}</span>
      </div>

    </header>
  );
};

export default AdminHeader;