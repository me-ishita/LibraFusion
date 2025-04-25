import React, { useState } from 'react';
import axios from 'axios';
import './AddBooks.css';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
    const navigate = useNavigate();
    const [Data, setData] = useState({
        bookname: "",
        isbn: "",
        description: "",
        author: "",
        image: "",
        price: "",
        quantity: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5007/api/addbook", Data);
            alert(res.data.message);
            setData({
                bookname: "",
                isbn: "",
                description: "",
                author: "",
                image: "",
                price: "",
                quantity: "",
            });
        } catch (error) {
            console.error('There was an error adding the book:', error);
            alert('There was an error adding the book. Please try again.');
        }
    };

    const handleAdd = () => {
        navigate('/books');
    };

    return (
        <div className='add-books-container'>
            <div className='form-container'>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="bookname" className="form-label">Book Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bookname"
                            placeholder="Enter Book Name"
                            name='bookname'
                            value={Data.bookname}
                            onChange={change}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn" className="form-label">ISBN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            placeholder="Enter ISBN of the Book"
                            name='isbn'
                            value={Data.isbn}
                            onChange={change}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author" className="form-label">Author Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="Enter Author of the Book"
                            name='author'
                            value={Data.author}
                            onChange={change}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Enter Description of the Book"
                            name='description'
                            value={Data.description}
                            onChange={change}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            placeholder="Enter Image URL of the Book"
                            name='image'
                            value={Data.image}
                            onChange={change}
                        />
                    </div>
                    <div className="form-group flex-group">
                        <div>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name='price'
                                value={Data.price}
                                onChange={change}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name='quantity'
                                value={Data.quantity}
                                onChange={change}
                            />
                        </div>
                    </div>
                    <button type='submit' className='btn-submit' onClick={handleAdd}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
