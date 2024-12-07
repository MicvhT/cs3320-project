import React, { useState } from "react";
import Navbar from "../components/navbar";
import './available.css';
import { Link } from "react-router-dom";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Scribner",
    isbn: "9780743273565"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    isbn: "9780060935467"
  },
  {
    title: "1984",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    isbn: "9780451524935"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publisher: "T. Egerton",
    isbn: "9780141439518"
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    publisher: "Harper & Brothers",
    isbn: "9781503280786"
  }
];

export default function Available() {
  const [selectedBooks, setSelectedBooks] = useState([]);

  // Toggle book selection
  const toggleSelection = (book) => {
    setSelectedBooks((prev) =>
      prev.includes(book)
        ? prev.filter((b) => b !== book) // Remove if already selected
        : [...prev, book] // Add if not already selected
    );
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="header">Title</div>
        <div className="header">Author</div>
        <div className="header">Publisher</div>
        <div className="header">ISBN</div>
        <div className="header">Select</div>

        {books.map((book, index) => (
          <React.Fragment key={index}>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.publisher}</div>
            <div>{book.isbn}</div>
            <div>
              <input
                type="checkbox"
                onChange={() => toggleSelection(book)}
                checked={selectedBooks.includes(book)}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Checkout Button */}
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
