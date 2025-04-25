import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import './UserBooks.css'; // Import the CSS file

const UserBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5007/api/getbooks');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleBookClick = (id) => {
        navigate(`/bookdetails/${id}`);
    };

    return (
        <div className='user-books-bg'>
            <UserNavbar />
            <div className='books-grid'>
                {books.map((item) => (
                    <div key={item._id} className='book-card' onClick={() => handleBookClick(item._id)}>
                        <div className='book-image-container'>
                            <img
                                className='book-image'
                                src={item.image}
                                alt={item.bookname}
                            />
                        </div>
                        <h6 className='book-title'>
                            {item.bookname.slice(0, 30)}...
                        </h6>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBooks;
