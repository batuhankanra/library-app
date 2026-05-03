import { useAppSelector } from "../../store/app_hook";

const AdminHeader = () => {
  const { user } = useAppSelector((state) => state.auth_slice);

  return (
    <header className="bg-gray-900 text-white border-b px-6 py-3 flex justify-between items-center">
      <span>

      </span>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-500  flex items-center text-white justify-center text-sm">
          {user?.name?.charAt(0).toUpperCase()} 
        </div>

        <span className="text-sm ">
          {user?.name}
        </span>
      </div>
    </header>
  );
};

export default AdminHeader;