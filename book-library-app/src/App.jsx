import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import { searchBooks, getBookDetails } from "./services/openLibraryApi";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setError("");
    setLoading(true);
    setSelectedBook(null);
    try {
      const data = await searchBooks(query);
      if (data.docs.length === 0) {
        setError("No books found for this search.");
        setBooks([]);
      } else {
        setBooks(data.docs);
      }
    } catch {
      setError("Something went wrong while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = async (book) => {
    setError("");
    setLoading(true);
    try {
      const olid = book.key.split("/").pop();
      const details = await getBookDetails(olid);
      setSelectedBook(details);
    } catch {
      setError("Unable to fetch book details.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
     <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">
        📚 Book Library
      </h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !selectedBook && books.length > 0 && (
        <BookList books={books} onSelect={handleSelectBook} />
      )}

      {!loading && selectedBook && <BookDetails book={selectedBook} />}
     </div>
  </div>
  );
}

export default App;