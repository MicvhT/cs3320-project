import React from "react";
import Navbar from "../components/navbar";
import './checkout.css';
import { useLocation } from "react-router-dom";
import DateDisplay from "../components/date";

export default function Checkout() {
  const location = useLocation();
  const { selectedBooks } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="review-container">
        {selectedBooks && selectedBooks.length > 0 ? (
          selectedBooks.map((book, index) => (
            <div key={index}>
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
            </div>
          ))
        ) : (
          <div>
            <h1>You Have Not Selected Any Books</h1>
          </div>
        )}
        <div>
            <label for="name">Your Name: </label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name Here" />
            <p>Due Date:</p>
            <DateDisplay />
        </div>
      </div>
    </>
  );
}
