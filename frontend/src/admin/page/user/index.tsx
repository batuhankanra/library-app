import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../../../store/features/user/user_slice";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(
    (state) => state.user_slice
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // 🔥 DATE FORMAT
  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Kullanıcı silinsin mi?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleRoleChange = (id: string, role: string) => {
    dispatch(updateUserRole({ id, role }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center py-10">{error}</p>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Ad</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Kayıt Tarihi</th>
              <th className="p-3">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>

                {/* ROLE */}
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* DATE */}
                <td className="p-3">
                  {formatDate(user.createdAt)}
                </td>

                {/* ACTION */}
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminUsers;