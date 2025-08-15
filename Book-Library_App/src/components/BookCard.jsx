
function BookCard({ book, onSelect }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      onClick={() => onSelect(book)}
      className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg transition"
    >
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
    </div>
  );
}


export default BookCard;
