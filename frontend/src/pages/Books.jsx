import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookSection from '../components/BookSection';
import { AdminNavbar } from '../components/AdminNavbar';

const Books = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5007/api/getbook");
                setData(response.data.books);
            } catch (error) {
                console.error('There was an error fetching the book data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='bg-dark' style={{ minHeight: "91.5vh" }}>
            <AdminNavbar />
            <div className='d-flex justify-content-center align-items-center py-3'>
                
            </div>
            {data.length > 0 ? (
                <BookSection data={data} setData={setData} />
            ) : (
                <div className='text-white'>Loading.....</div>
            )}
        </div>
    );
};

export default Books;
