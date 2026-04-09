import React from 'react'
import type { Book } from '../types'



const Card:React.FC<Book> = (book) => {
  return (
    <div
      key={book._id}
      className="min-w-50 bg-white border rounded-xl p-4 shadow hover:shadow-md transition shrink-0"
    >
      <div className="h-28 bg-gray-200 rounded mb-3" />
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </div>
  )
}

export default Card
