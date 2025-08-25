import BookCard from "./BookCard";

function Bookmarks({ books, onSelect }) {
  if (books.length === 0) {

    return <p className="text-white">No bookmarks yet.</p>;
  }

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-white">⭐ Saved Books</h2>
    <div className="grid gap-4 p-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelect={onSelect} />
      ))}
    </div>
    </div>
  );
}

export default Bookmarks;
