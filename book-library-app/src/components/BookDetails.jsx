function BookDetails({ book, onBookmark }) {
  if (!book) return null;
  
  const coverId = book.covers ? book.covers[0] : null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-48 md:w-64 rounded-lg shadow"
          />
        </div>

        {/* Book Info */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            {book.title}
          </h2>

          {book.description && (
            <p className="mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}
          <button
            onClick={() => onBookmark(book)}
            className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow"
          >
            ⭐ Add to Bookmarks
          </button>

          <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
            {book.first_publish_date && (
              <li><strong>📅 Published:</strong> {book.first_publish_date}</li>
            )}
            {book.subjects && (
              <li>
                <strong>🏷 Subjects:</strong> {book.subjects.slice(0, 5).join(", ")}
              </li>
            )}
            {book.pagination && (
              <li><strong>📖 Pages:</strong> {book.pagination}</li>
            )}
            {book.isbn_10 && (
              <li><strong>🔖 ISBN-10:</strong> {book.isbn_10.join(", ")}</li>
            )}
            {book.isbn_13 && (
              <li><strong>🔖 ISBN-13:</strong> {book.isbn_13.join(", ")}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
