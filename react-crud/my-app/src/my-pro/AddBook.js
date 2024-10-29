import { useState } from 'react';

function AddBook() {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields (optional, but recommended)
        if (!name || !description || !id) {
            setMessage('Please fill out all fields.');
            return;
        }

        // Send POST request to add a new book
        try {
            const numId = Number(id)
            setId(numId)
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name, description }),
            });

            if (response.ok) {
                console.log(JSON.stringify({id, name, description }));

                setMessage('Book added successfully!');
                setId(0);          
                setName('');          
                setDescription('');    
            } else {
                setMessage('Failed to add book.');
            }
        } catch (error) {
            console.error('Error adding book:', error);
            setMessage('Error adding book.');
        }
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Id:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
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
                <button type="submit">Add Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddBook;
