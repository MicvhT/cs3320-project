import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
import { checkOutBook, checkInBook, fetchCheckedOutBooks } from "../api";
import './checkout.css';

export default function Checkout() {
  const location = useLocation();
  const { selectedBooks } = location.state || [];
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch the list of checked-out books
  const loadCheckedOutBooks = async () => {
    try {
      const data = await fetchCheckedOutBooks();
      setCheckedOutBooks(data);
    } catch (err) {
      setError("Error fetching checked-out books: " + err.message);
    }
  };

  useEffect(() => {
    loadCheckedOutBooks();
  }, []);

  // Handle book checkout
  const handleCheckout = async () => {
    try {
      for (const book of selectedBooks) {
        await checkOutBook(book._id, { checked_out_by: name, due_date: new Date().toISOString() });
      }
      setSuccess(true);
      setError(null);
      await loadCheckedOutBooks(); // Refresh the list after checkout
    } catch (err) {
      setError("Error during checkout: " + err.message);
      
    }
    // Clear the selected books
    document.getElementById('checkedout-books').style.display = 'none';
  };

  // Handle book check-in
  const handleCheckIn = async (id) => {
    try {
      await checkInBook(id);
      setCheckedOutBooks((prev) => prev.filter((book) => book._id !== id)); // Remove the book from the list
      setError(null);
    } catch (err) {
      setError("Error during check-in: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1 id='checkout-heading'>Checked-Out Books</h1>
        {error && <p className="error">{error}</p>}
        {success && <p>Checkout successful!</p>}
        <div className="grid-container">
          <div className="header">Title</div>
          <div className="header">Author</div>
          <div className="header">Checked Out By</div>
          <div className="header">Due Date</div>
          <div className="header">Actions</div>
          {checkedOutBooks.map((book, index) => (
            <React.Fragment key={index}>
              <div>{book.title}</div>
              <div>{book.author}</div>
              <div>{book.checked_out_by}</div>
              <div>{new Date(book.due_date).toLocaleDateString()}</div>
              <div>
                <button onClick={() => handleCheckIn(book._id)}>Check In</button>
              </div>
            </React.Fragment>
          ))}
        </div>
        {selectedBooks && selectedBooks.length > 0 && (
          <div id='checkedout-books'>
            <h2>Books to Checkout</h2>
            {selectedBooks.map((book, index) => (
              <div key={index}>
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
              </div>
            ))}
            <div>
              <label htmlFor="name">Your Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleCheckout}>Confirm Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
