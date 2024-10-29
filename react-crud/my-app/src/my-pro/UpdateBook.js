import { useEffect, useState } from 'react';

function UpdateBook({ bookId }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the current book details
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
                if (response.ok) {
                    const book = await response.json();
                    setName(book.name);
                    setDescription(book.description);
                } else {
                    setMessage('Failed to fetch book details.');
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
                setMessage('Error fetching book details.');
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!name || !description) {
            setMessage('Please fill out all fields.');
            return;
        }

        // Send PUT request to update the book
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });
            console.log(JSON.stringify({ name, description }));

            if (response.ok) {
                setMessage('Book updated successfully!');
            } else {
                setMessage('Failed to update book.');
            }
        } catch (error) {
            console.error('Error updating book:', error);
            setMessage('Error updating book.');
        }
    };

    return (
        <div>
            <h2>Update Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateBook;
