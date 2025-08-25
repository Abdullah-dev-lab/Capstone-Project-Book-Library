import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import BookDetails from "../components/BookDetails";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

function HomePage({
  books,
  randomBooks,
  selectedBook,
  loading,
  error,
  onSearch,
  onSelect,
  onBookmark,
}) {
  return (
    <div>
      <SearchBar onSearch={onSearch} />
       {loading && <Loader />}
       {error && <ErrorMessage message={error} />}
       {!loading && !selectedBook && books.length > 0 && (
         <BookList books={books} onSelect={onSelect} />
       )}
       {!loading && !selectedBook && books.length === 0 && randomBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">📖 Discover Random Books</h2>
          <BookList books={randomBooks} onSelect={onSelect} />
        </div>
      )}
       {!loading && selectedBook && (
         <BookDetails book={selectedBook} onBookmark={onBookmark} />
        )}
    </div>
  );
}

export default HomePage;