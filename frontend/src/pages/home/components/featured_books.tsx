import {  useRef, useState } from "react";
import { useAppSelector } from "../../../store/app_hook";


const FeaturedBooks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { books } = useAppSelector(
        (state) => state.book_slice
      );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  // Mouse drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;

    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDown(false);
  };

  return (
    <div className="space-y-4 border p-2 rounded-lg border-zinc-300">
      <h2 className="text-xl font-bold">Beğenilen Kitaplar</h2>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing pb-3 "
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
      >
        {books.map((book,i) => (
          <div
            key={i}
            className="min-w-50 bg-white border rounded-xl p-4 shadow hover:shadow-md transition shrink-0"
          >
            <div className="h-28 bg-gray-200 rounded mb-3" />

            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;