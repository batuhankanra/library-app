import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";

import {
  getUsers,
  deleteUser,
  updateUserRole,
  resetUserScore,
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

    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // 🔥 DELETE
  const handleDelete = (id: string) => {
    const ok = window.confirm(
      "Bu kullanıcı silinsin mi?"
    );

    if (ok) {
      dispatch(deleteUser(id));
    }
  };

  // 🔥 ROLE
  const handleRoleChange = (
    id: string,
    role: string
  ) => {
    dispatch(updateUserRole({ id, role }));
  };

  // 🔥 RESET SCORE
  const handleResetScore = (id: string) => {
    const ok = window.confirm(
      "Kullanıcının  puanı sıfırlansın mı?"
    );

    if (ok) {
      dispatch(resetUserScore(id));
    }
  };

  // 🔄 loading
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ error
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Kullanıcı Yönetimi
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Toplam kullanıcı: {users.length}
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Ad</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Puanı</th>
              <th className="p-4">Kayıt Tarihi</th>
              <th className="p-4 text-right">
                İşlemler
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* NAME */}
                <td className="p-4 font-medium">
                  {user.name}
                </td>

                {/* EMAIL */}
                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className="border px-2 py-1 rounded-lg text-sm"
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </td>

                {/* SCORE */}
                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.score > 0
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.score ?? 0}
                    </span>

                    {user.score < 0 && (
                      <button
                        onClick={() =>
                          handleResetScore(user._id)
                        }
                        className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition"
                      >
                        Sıfırla
                      </button>
                    )}

                  </div>

                </td>

                {/* DATE */}
                <td className="p-4 text-gray-500">
                  {formatDate(user.createdAt)}
                </td>

                {/* ACTION */}
                <td className="p-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Sil
                    </button>

                  </div>

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