import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/app_hook";
import { borrowBook, returnBook } from "../../store/features/borrow/borrow_slice";
import { getOneBook, clearSelectedBook } from "../../store/features/book/book_slice";

const MAX_DAYS = 15;

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedBook, isLoading } = useAppSelector(
    (state) => state.book_slice
  );

  const [days, setDays] = useState(7);

  // 🔥 SAYFA AÇILINCA ÇEK
  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
    }

    // cleanup
    return () => {
      dispatch(clearSelectedBook());
    };
  }, [id]);

  // 🔄 loading
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ not found
  if (!selectedBook) {
    return (
      <div className="text-center py-20 text-gray-500">
        Kitap bulunamadı
      </div>
    );
  }

  const status = selectedBook.status.toLowerCase();

  // 🔹 borrow
  const handleBorrow = () => {
    dispatch(borrowBook(selectedBook._id));
  };

  // 🔹 return
  const handleReturn = () => {
    dispatch(returnBook(selectedBook._id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      
      {/* 📸 IMAGE */}
      <div className="w-full h-100 bg-gray-100 rounded-xl overflow-hidden">
        {selectedBook.image ? (
          <img
            src={`http://localhost:3000${selectedBook.image}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Görsel yok
          </div>
        )}
      </div>

      {/* 📚 INFO */}
      <div className="space-y-5">

        <h1 className="text-3xl font-bold">
          {selectedBook.title}
        </h1>

        <p className="text-gray-600">
          {selectedBook.author}
        </p>

        {/* STATUS */}
        <span
          className={`inline-block px-3 py-1 text-sm rounded ${
            status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status === "available" ? "Müsait" : "Ödünç Alınmış"}
        </span>

        {/* 📅 DAY PICKER */}
        {status === "available" && (
          <div className="space-y-2">
            <label className="text-sm text-gray-600">
              Kaç günlüğüne almak istiyorsun?
            </label>

            <input
              type="range"
              min={1}
              max={MAX_DAYS}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full"
            />

            <div className="text-sm text-gray-700">
              Seçilen süre: <b>{days} gün</b>
            </div>
          </div>
        )}

        {/* ACTION */}
        <div className="pt-4">

          {status === "available" ? (
            <button
              onClick={handleBorrow}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Ödünç Al ({days} gün)
            </button>
          ) : (
            <button
              onClick={handleReturn}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              İade Et
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default BookDetail;