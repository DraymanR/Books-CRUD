import { useState } from 'react';
import './App.css';
import AddBook from './my-pro/AddBook';
import AllBooks from './my-pro/AllBooks';

function App() {
    const [showAddBook, setShowAddBook] = useState(false);

    return (
        <div className="App">
            <button onClick={() => setShowAddBook(!showAddBook)}>
                {showAddBook ? 'Hide Add Book' : 'Add Book'}
            </button>
            {showAddBook && <AddBook />}
            <AllBooks />
        </div>
    );
}

export default App;

