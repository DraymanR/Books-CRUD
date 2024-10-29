import { useEffect, useState } from 'react';

import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';


function AllBooks() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false); // To refresh the list after deletion
    const [selectedBookId, setSelectedBookId] = useState(null); // Track selected book for update

    useEffect(() => {
        fetch('http://localhost:5000/api/books')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [refresh]); // Re-fetch data when refresh changes

    const handleDelete = async (bookId) => {
        // Perform the deletion by calling the API
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setRefresh(!refresh); // Toggle refresh to re-fetch data
        } else {
            console.error('Failed to delete book');
        }
    };

    return (
        <div>
            <h1>Items List</h1>
            {data ? data.map(book => (
                <div key={book.id}>
                    <h2>{book.name}</h2>
                    <p>{book.Description}</p>
                    <button onClick={() => handleDelete(book.id)}>🗑️</button>
                    <button onClick={() => setSelectedBookId(book.id)}>✏️</button>
                </div>
            )) : <p>Loading...</p>}
             {selectedBookId && <UpdateBook bookId={selectedBookId} />}
        </div>
    );
}
export default AllBooks;
