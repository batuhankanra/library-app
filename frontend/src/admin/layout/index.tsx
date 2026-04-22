import { useEffect } from "react";
import { Outlet } from "react-router";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useAppDispatch } from "../../store/app_hook";
import { getMe } from "../../store/features/auth/auth_slice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className="flex min-h-screen">
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <AdminHeader />

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;