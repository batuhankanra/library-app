
import Card from "../../../components/card";
import {  useAppSelector } from "../../../store/app_hook";

const NewBooks = () => {

   const { books } = useAppSelector(
      (state) => state.book_slice
    );

    const sortedBooks = [...books].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);

 

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">🆕 Yeni Eklenen Kitaplar</h2>

     
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedBooks.map((book) => (
            <Card _id={book._id} key={book._id}  author={book.author} title={book.title} description={book.isbn}  />
          ))}
        </div>
    </section>
  );
};

export default NewBooks;