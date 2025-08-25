import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import HomePage from "./components/HomePage";
import { searchBooks, getBookDetails, getRandomBooks } from "./services/openLibraryApi";

function App() {
  const [books, setBooks] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

   useEffect(() => {
    const fetchRandom = async () => {
      try {
        const data = await getRandomBooks("fiction");
       const normalized = (data.works || []).map((book) => ({
        key: book.key, 
        title: book.title,
        author_name: book.authors ? book.authors.map((a) => a.name) : ["Unknown"],
        cover_i: book.cover_id,
        publisher: book.subject ? [book.subject[0]] : ["Unknown"],
      }));
      setRandomBooks(normalized);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRandom();
  }, []);

   useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

   useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  const handleBookmark = (book) => {
  if (!book.key) return;
  if (!bookmarks.find((b) => b.key === book.key)) {
    setBookmarks([...bookmarks, book]);
  }
};


  const handleSelectBook = async (book) => {
    setError("");
    setLoading(true);
    try {
      const olid = book.key.split("/").pop();
      const details = await getBookDetails(olid);
      setSelectedBook({ ...book, ...details});
    } catch {
      setError("Unable to fetch book details.");
    } finally {
      setLoading(false);
    }
  };

return (
 <Router>
   <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4">
       <nav className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold text-center mb-4 text-white">
         📚 Book Library
         </h1>
         <div className="space-x-4">
              <Link to="/" className="text-blue-600 hover:underline">
                Home
              </Link>
              <Link to="/bookmarks" className="text-blue-600 hover:underline">
                Bookmarks ({bookmarks.length})
              </Link>
            </div>
       </nav>
       <Routes>
        <Route 
         path="/"
              element={
                <HomePage
                  books={books}
                  randomBooks={randomBooks}
                  selectedBook={selectedBook}
                  loading={loading}
                  error={error}
                  onSearch={handleSearch}
                  onSelect={handleSelectBook}
                  onBookmark={handleBookmark}
        />
      }
    />
        <Route
              path="/bookmarks"
              element={
                <Bookmarks books={bookmarks} onSelect={handleSelectBook} />
              }
            />
       </Routes>
      </div>
   </div>
  </Router>
 );
}


export default App;