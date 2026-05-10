import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app_hook";
import { getProfile } 

const Profile = () => {
  const dispatch = useAppDispatch();

  const {
    profile,
    activeBorrows,
    history,
    isLoading,
    error,
  } = useAppSelector((state) => state.user_slice);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  // 🔹 DATE FORMAT
  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // 🔄 LOADING
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-5">

          {/* AVATAR */}
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-2xl font-bold">
              {profile?.name}
            </h1>

            <p className="text-gray-500">
              {profile?.email}
            </p>

            <div className="flex gap-2 mt-3">

              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                Rol: {profile?.role}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  (profile?.score || 0) > 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                Ceza Puanı: {profile?.score || 0}
              </span>

            </div>
          </div>

        </div>
      </div>

      {/* ACTIVE BORROWS */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Aktif Ödünçler
          </h2>

          <span className="text-sm text-gray-500">
            {activeBorrows?.length || 0} kitap
          </span>
        </div>

        {activeBorrows?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            Aktif ödünç kitabın bulunmuyor
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {activeBorrows.map((borrow: any) => (
              <div
                key={borrow._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >

                <img
                  src={`http://localhost:3000${borrow.bookId.image}`}
                  alt={borrow.bookId.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4 space-y-2">

                  <h3 className="font-bold line-clamp-1">
                    {borrow.bookId.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {borrow.bookId.author}
                  </p>

                  <div className="pt-2 text-sm space-y-1">

                    <p>
                      <span className="font-medium">
                        Alınma:
                      </span>{" "}
                      {formatDate(borrow.borrowDate)}
                    </p>

                    <p>
                      <span className="font-medium">
                        Teslim:
                      </span>{" "}
                      {formatDate(borrow.dueDate)}
                    </p>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* HISTORY */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Geçmiş
          </h2>

          <span className="text-sm text-gray-500">
            {history?.length || 0} kayıt
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Kitap</th>
                <th className="p-4">Alınma</th>
                <th className="p-4">Teslim Tarihi</th>
                <th className="p-4">İade Tarihi</th>
              </tr>
            </thead>

            <tbody>
              {history?.map((borrow: any) => (
                <tr
                  key={borrow._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* BOOK */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <img
                        src={`http://localhost:3000${borrow.bookId.image}`}
                        alt={borrow.bookId.title}
                        className="w-12 h-16 rounded object-cover"
                      />

                      <div>
                        <p className="font-semibold">
                          {borrow.bookId.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {borrow.bookId.author}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* BORROW DATE */}
                  <td className="p-4">
                    {formatDate(borrow.borrowDate)}
                  </td>

                  {/* DUE DATE */}
                  <td className="p-4">
                    {formatDate(borrow.dueDate)}
                  </td>

                  {/* RETURN DATE */}
                  <td className="p-4">
                    {formatDate(borrow.returnDate)}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default Profile;