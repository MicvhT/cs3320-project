import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { fetchBookById, updateBook } from "../api";

export default function UpdateBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: "", author: "", publisher: "", isbn: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
        try {
            const book = await fetchBookById(id);
            setBook(book);
        } catch (err) {
            setError("Error fetching book: " + err.message);
        }
    };
    loadBook();
}, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, book);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Update Book</h1>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
          <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
          <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
          <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
          <button type="submit">Update Book</button>
        </form>
        {success && <p>Book updated successfully!</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}
