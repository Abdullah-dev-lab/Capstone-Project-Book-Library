// src/components/BookList.jsx
import BookCard from "./BookCard";

function BookList({ books, onSelect }) {
  return (
     <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default BookList;