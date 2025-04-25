import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = ({ data, setData }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        bookname: "",
        isbn: "",
        description: "",
        author: "",
        image: "",
        price: "",
        quantity: "",
    });

    useEffect(() => {
        if (Array.isArray(data)) {
            const book = data.find(item => item._id.toString() === id);
            if (book) {
                setBookData(book);
            }
        }
    }, [id, data]);

    const change = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5007/api/updatebook/${id}`, bookData);
            alert('Book updated successfully');
            const updatedBooks = data.map(item => (item._id.toString() === id ? res.data : item));
            setData(updatedBooks);
            navigate('/books');
        } catch (error) {
            console.error('There was an error updating the book:', error);
            
        }
    };

    return (
        <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "91.5vh" }}>
            <div className='container bg-indigo p-2'>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="bookname" className="form-label text-white">
                            Book Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="bookname"
                            placeholder="Enter Book Name"
                            name='bookname'
                            value={bookData.bookname}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label text-white">
                            ISBN
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            placeholder="Enter ISBN of the Book"
                            name='isbn'
                            value={bookData.isbn}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label text-white">
                            Author Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="Enter Author of the Book"
                            name='author'
                            value={bookData.author}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label text-white">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Enter Description of the Book"
                            name='description'
                            value={bookData.description}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label text-white">
                            Image
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            placeholder="Enter the Book Image"
                            name='image'
                            value={bookData.image}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label text-white">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Enter Price of the Book"
                            name='price'
                            value={bookData.price}
                            onChange={change}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label text-white">
                            Quantity
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Enter Quantity of the Book"
                            name='quantity'
                            value={bookData.quantity}
                            onChange={change}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>UPDATE</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
