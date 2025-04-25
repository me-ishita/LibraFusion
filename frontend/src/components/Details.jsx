import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/updatebook/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5007/api/deletebook/${id}`);
      alert(res.data.message);
      navigate('/books'); // Redirect to admin home after deletion
    } catch (error) {
      console.error('There was an error deleting the book:', error);
      alert('Error deleting the book');
    }
  };

  const handleBorrowedByClick = () => {
    navigate(`/borrowedby/${id}`);
};

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5007/api/getbook/${id}`);
        setBook(response.data.book); // Access the book object
        setLoading(false);
      } catch (err) {
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>No book found</div>;
  }

  return (
    <div className='details-bg'>
      <div className='details-container'>
        <div className='image-container'>
          <img className='image' src={book.image} alt={book.bookname} />
        </div>
        <div className='info'>
          <h2>{book.bookname}</h2>
          <p><strong>Author:  </strong>  {book.author} </p>
          <p><strong>ISBN:  </strong> {book.isbn}</p>
          <p><strong>Description:  </strong> {book.description}</p>
          <p><strong>Price:  </strong> Rs. {book.price}</p>
          <p><strong>Quantity:  </strong> {book.quantity}</p>
          <button className='edit-button' onClick={handleEditClick}>EDIT</button>
          <button className='delete-button' onClick={handleDelete}>DELETE</button>
          <button className='borrowed-button' onClick={handleBorrowedByClick}>BORROWED BY</button>

        </div>
      </div>
    </div>
  );
};

export default Details;
