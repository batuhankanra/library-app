import { useEffect, useState } from "react";
import api from "../../../services/axios";
import type { Book } from "../../../types";
import Card from "../../../components/card";

const NewBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get<Book[]>("/books?limit=6&sort=desc");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">🆕 Yeni Eklenen Kitaplar</h2>

      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card _id={book._id} author={book.author} title={book.title} description={book.description}  />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewBooks;