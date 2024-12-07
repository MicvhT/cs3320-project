const API_BASE_URL = 'http://localhost:3000/api/books';

// Fetch all available books
export const fetchAvailableBooks = async () => {
    const response = await fetch(`${API_BASE_URL}/available`);
    if (!response.ok) {
        throw new Error('Failed to fetch available books');
    }
    return response.json();
};

// Fetch a book by ID
export const fetchBookById = async (bookId) => {
    const response = await fetch(`${API_BASE_URL}/${bookId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch book details');
    }
    return response.json();
};

// Fetch all checked out books
export const fetchCheckedOutBooks = async () => {
    const response = await fetch(`${API_BASE_URL}/checked-out`);
    if (!response.ok) {
        throw new Error('Failed to fetch checked-out books');
    }
    return response.json();
};

// Add a new book to the database
export const addBook = async (book) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to add book');
    }
    return response.json();
};

// Check out a book
export const checkOutBook = async (bookId, checkoutDetails) => {
    const response = await fetch(`${API_BASE_URL}/${bookId}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutDetails),
    });
    if (!response.ok) {
        throw new Error('Failed to check out book');
    }
    return response.json();
};


// Update a book by ID
export const updateBook = async (bookId, updates) => {
    const response = await fetch(`${API_BASE_URL}/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Failed to update book');
    }
    return response.json();
};

// Delete a book by ID
export const deleteBook = async (bookId) => {
    const response = await fetch(`${API_BASE_URL}/${bookId}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
    return response.json();
};

// Check in a book
export const checkInBook = async (bookId) => {
    const response = await fetch(`${API_BASE_URL}/${bookId}/check-in`, { method: 'POST' });
    if (!response.ok) {
        throw new Error('Failed to check in book');
    }
    return response.json();
};
