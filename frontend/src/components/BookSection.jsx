import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ('./BookSection.css')

const BookSection = () => {
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
        navigate(`/details/${id}`);
    };

    return (
        <div className='admin-books-bg'>
            
            <div className='grid'>
                {books.map((item) => (
                    <div key={item._id} className='card' onClick={() => handleBookClick(item._id)}>
                        <div className='image'>
                            <img
                                className='book-images'
                                src={item.image}
                                alt={item.bookname}
                            />
                        </div>
                        <h6 className='title'>
                            {item.bookname.slice(0, 30)}...
                        </h6>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSection;
