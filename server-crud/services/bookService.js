const fs = require('fs').promises;

async function readBookFile() {
    try {
        const data = await fs.readFile("../server-crud/DB/books.json", "utf8");
        const books = JSON.parse(data);
        return books;        
    } catch (error) {
        console.error('Error reading JSON file', error);
        throw error;       
    }
}

async function writeBookFile(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2); // 'null, 2' makes the JSON readable
        await fs.writeFile("../server-crud/DB/books.json", jsonData, "utf8");
        console.log('Data successfully written to file');
    } catch (error) {
        console.error('Error writing to JSON file', error);
        throw error;
    }
}

// Fetch all books
async function getAllBooks() {
    try {
        return await readBookFile()
    } catch (error) {
        throw new Error('Error fetching books:', error);
    }
}

// Fetch a single book by ID
async function getBookById(id) {
    try {
        const books = await readBookFile()
        const book = books.filter(b => b.id == id)
        console.log(book,"servic getBookById()");
        return book[0];
    } catch (error) {
        throw new Error('Error fetching book:', error);
    }
}

// Create a new book
async function createBook(bookData) {
    try {
        const books = await readBookFile()
        const newBookData = { ...bookData,'id':Number(bookData.id)}
        const newBooks = [...new Set([...books, bookData])]
        await writeBookFile(newBooks)
        return;
    } catch (error) {
        throw new Error('Error creating book:', error);
    }
}

// Update a book by ID
async function updateBook(id, bookData) {
    try {
        const books = await readBookFile()
        books.map(book => (book.id === id ? { ...book, ...bookData } : book));
        return response.data;
    } catch (error) {
        throw new Error('Error updating book:', error);
    }
}

// Delete a book by ID
async function deleteBook(id) {
    try {
        console.log(id);
        const books = await readBookFile()
        const newBooks = books.filter(book => book.id !== Number(id))
        console.log(newBooks);      
        await writeBookFile(newBooks)
        return;
    } catch (error) {
        throw new Error('Error deleting book:', error);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};