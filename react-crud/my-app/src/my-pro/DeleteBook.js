import { useEffect, useState } from 'react';

function DeleteBook({ bookId }) {
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Book deleted successfully!');
            } else {
                setMessage('Failed to delete book.');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            setMessage('Error deleting book.');
        }
    };

    // Automatically trigger deletion when the component mounts
    useEffect(() => {
        handleDelete();
    }, []);

    return (
        <div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteBook;
