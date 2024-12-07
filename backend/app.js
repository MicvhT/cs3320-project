require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Built-in JSON parser
app.use(cors());

// MongoDB Connection
const uri = process.env.MONGO_URI; // Use the URI from .env
const client = new MongoClient(uri);

// Use a Promise to ensure connection is established before starting the server
client.connect()
    .then(() => {
        const db = client.db('library-backend'); // Use your database name
        console.log('Connected to MongoDB');

        // Routes (pass `db` to your routes)
        const booksRouter = require('./routes/books');
        app.use('/api/books', booksRouter(db));

        // Start the server only after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
