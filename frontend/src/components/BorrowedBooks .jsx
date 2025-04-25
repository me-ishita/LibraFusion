// src/components/BorrowedBooks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { userId } = useParams();
  //const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowedBooks();
  }, [userId, fetchBorrowedBooks]);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get(`/api/borrowed-books/${userId}`);
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  const handleReturnBook = async (borrowId) => {
    try {
      await axios.put(`/api/return-book/${borrowId}`);
      alert('Book returned successfully');
      fetchBorrowedBooks(); // Refresh the list
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <h1>Borrowed Books</h1>
      {borrowedBooks.length === 0 ? (
        <p>No books borrowed.</p>
      ) : (
        <ul>
          {borrowedBooks.map((borrow) => (
            <li key={borrow._id}>
              <h3>{borrow.bookId.title}</h3>
              <p>Borrowed on: {new Date(borrow.borrowedDate).toLocaleDateString()}</p>
              <button onClick={() => handleReturnBook(borrow._id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowedBooks;