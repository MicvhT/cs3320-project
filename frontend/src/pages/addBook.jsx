import React, { useState } from "react";
import Navbar from "../components/navbar";
import { addBook } from "../api";

export default function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", publisher: "", isbn: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(book);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Add a New Book</h1>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
          <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
          <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
          <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
          <button type="submit">Add Book</button>
        </form>
        {success && <p>Book added successfully!</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}
