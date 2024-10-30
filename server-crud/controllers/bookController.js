const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
    // res.json({'111':1})
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await bookService.updateBook(Number(req.params.id), req.body);
        res.json({ message: 'Book update successfully' });        
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await bookService.deleteBook(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
