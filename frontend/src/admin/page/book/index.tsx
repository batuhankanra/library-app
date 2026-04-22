import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import {
  getBooks,
  deleteBook,
} from "../../../store/features/book/book_slice";
import { Link } from "react-router";

const AdminBook = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector(
    (state) => state.book_slice
  );

  // 🔥 DATE FORMAT
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Bu kitabı silmek istediğinize emin misiniz?")) {
      dispatch(deleteBook(id));
    }
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kitap Yönetimi</h1>

        <Link
          to="/admin/add-book"
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
        >
          + Kitap Ekle
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Kapak</th>
              <th className="p-3">Başlık</th>
              <th className="p-3">Yazar</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Durum</th>
              <th className="p-3">Oluşturulma</th>
              <th className="p-3">Güncellenme</th>
              <th className="p-3">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={`http://localhost:3000${book.image}`}
                    className="w-12 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.isbn}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      book.status === "available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {book.status === "available"
                      ? "Müsait"
                      : "Ödünç"}
                  </span>
                </td>

               
                {/* CREATED AT */}
                <td className="p-3">
                  {book.createdAt
                    ? formatDate(book.createdAt)
                    : "-"}
                </td>

                {/* UPDATED AT */}
                <td className="p-3">
                  {book.updatedAt
                    ? formatDate(book.updatedAt)
                    : "-"}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2 items-center">
                  
                  <Link
                    to={`/admin/edit-book/${book._id}`}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-400 hover:text-black transition text-sm"
                  >
                    Düzenle
                  </Link>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400 hover:text-black transition text-sm"
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

export default AdminBook;