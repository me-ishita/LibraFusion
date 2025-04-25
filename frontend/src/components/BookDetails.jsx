import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './BookDetails.css';


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleBorrowBook = async () => {
    try {
      console.log("hiii");    
      console.log(localStorage.getItem("user"));
      //let info=JSON.parse(localStorage.getItem('user'));
      //console.log(info);
      
        
      const response = await axios.put(`http://localhost:5007/api/books/borrow-books/${id}`);
      console.log(response.data);
      alert("Book borrowed successfully!");
      navigate("/borrow-books");
    } catch (err) {
      console.error(err);
      alert("Book is Out of Stock");
      navigate("/borrow-books");
    }

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
  }, [id,book]);

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
    <div className='book-details-bg'>
      <div className='book-details-container'>
        <div className='book-image-container'>
          <img className='book-image' src={book?.image} alt={book?.bookname} />
        </div>
        <div className='book-info'>
          <h2>{book?.bookname}</h2>
          <p><strong>Author:</strong> {book?.author}</p>
          <p><strong>ISBN:</strong> {book?.isbn}</p>
          <p><strong>Description:</strong> {book?.description}</p>
          <p><strong>Price:</strong> Rs.{book?.price}</p>
          <p><strong>Quantity:</strong> {book?.quantity}</p>
          <button className="borrow-button" onClick={handleBorrowBook}>Borrow the Book</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;