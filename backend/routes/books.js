const express = require('express');
const { ObjectId } = require('mongodb');

const booksRouter = (db) => {
    const router = express.Router();
    const booksCollection = db.collection('books');

    // Get all available books
    router.get('/available', async (req, res) => {
        try {
            const books = await booksCollection.find({ available: true }).toArray();
            res.json(books);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch books' });
        }
    });

    // Get all checked-out books
    router.get('/checked-out', async (req, res) => {
        try {
            const books = await booksCollection.find({ available: false }).toArray();
            res.json(books);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch books' });
        }
    });

    router.post('/', async (req, res) => {
        try {
            console.log('Request Body:', req.body); // Log incoming request body
            const book = req.body;
    
            // Validate required fields
            if (!book.title || !book.author || !book.publisher || !book.isbn) {
                console.error('Missing fields in request body');
                return res.status(400).json({ error: 'Missing required fields' });
            }
    
            book.available = true; // Set default availability
    
            // Insert into MongoDB
            const result = await booksCollection.insertOne(book);
            console.log('Insert Result:', result); // Log the database result
    
            // Respond with the inserted document (use `insertedId` for newer drivers)
            const insertedBook = { ...book, _id: result.insertedId };
            res.status(201).json(insertedBook); // Return the inserted document
        } catch (err) {
            console.error('Error adding book:', err); // Log the error
            res.status(500).json({ error: 'Failed to add book' });
        }
    });
    

    // Check out a book
    router.post('/:id/checkout', async (req, res) => {
        try {
            const { id } = req.params;
            const { checked_out_by, due_date } = req.body;

            const result = await booksCollection.updateOne(
                { _id: new ObjectId(id), available: true },
                {
                    $set: {
                        available: false,
                        checked_out_by,
                        due_date,
                    },
                }
            );

            if (result.modifiedCount === 0) {
                return res.status(400).json({ error: 'Book is not available or invalid ID' });
            }

            res.json({ message: 'Book checked out successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to check out book' });
        }
    });

    // Check in a book
    router.post('/:id/check-in', async (req, res) => {
        try {
            const { id } = req.params;

            const result = await booksCollection.updateOne(
                { _id: new ObjectId(id), available: false },
                {
                    $set: {
                        available: true,
                    },
                    $unset: {
                        checked_out_by: '',
                        due_date: '',
                    },
                }
            );

            if (result.modifiedCount === 0) {
                return res.status(400).json({ error: 'Book is not checked out or invalid ID' });
            }

            res.json({ message: 'Book checked in successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to check in book' });
        }
    });

    // Update a book
    router.put('/:id', async (req, res) => {
        const { id } = req.params; // Get the book ID from the route
        const updates = req.body; // Get the updates from the request body

        try {
            const result = await db.collection('books').updateOne(
                { _id: new ObjectId(id) },
                { $set: updates }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.json({ message: 'Book updated successfully' });
        } catch (err) {
            console.error('Error updating book:', err.message);
            res.status(500).json({ error: 'Failed to update book' });
        }
    });
    // Retrieve book info
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        console.log("Received ID:", id); // Log the received ID
    
        try {
            const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
            if (!book) {
                console.log("Book not found for ID:", id); // Log if not found
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json(book);
        } catch (err) {
            console.error("Error fetching book details:", err.message);
            res.status(500).json({ error: 'Failed to fetch book details' });
        }
    });
    

    // Delete a book
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(400).json({ error: 'Invalid ID' });
            }

            res.json({ message: 'Book deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete book' });
        }
    });
    

    return router;
};

module.exports = booksRouter;
