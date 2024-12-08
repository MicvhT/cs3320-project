import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import './available.css';
import { Link, useNavigate } from "react-router-dom";
import { fetchAvailableBooks, deleteBook } from "../api";

export default function Available() {
  const [books, setBooks] = useState([]); // Dynamically populated from backend
  const [selectedBooks, setSelectedBooks] = useState([]); // For checkout
  const navigate = useNavigate();

  // Fetch books from backend
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchAvailableBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err.message);
      }
    };
    loadBooks();
  }, []);

  const toggleSelection = (book) => {
    setSelectedBooks((prev) =>
      prev.includes(book)
        ? prev.filter((b) => b !== book)
        : [...prev, book]
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book._id !== id)); // Update books after deletion
    } catch (err) {
      console.error("Error deleting book:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="header">Title</div>
        <div className="header">Author</div>
        <div className="header">Publisher</div>
        <div className="header">ISBN</div>
        <div className="header">Actions</div>
        {books.map((book, index) => (
          <React.Fragment key={index}>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.publisher}</div>
            <div>{book.isbn}</div>
            <div>
              <button onClick={() => toggleSelection(book)}>
                {selectedBooks.includes(book) ? "Deselect" : "Select"}
              </button>
              <button onClick={() => navigate(`/update-book/${book._id}`)}>Update</button>

              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Link
        to="/checkout"
        state={{ selectedBooks }}
        className="checkout"
      >
        Checkout Selected Books
      </Link>
    </>
  );
}
