import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import UserHome from '../src/Pages/UserHome';
import AdminHome from './Pages/AdminHome';
import Books from './Pages/Books';
import AddBooks from './Pages/AddBooks';
import Update from '../src/Pages/Update';
import UserBooks from './components/UserBooks';
import UpdateProfile from './Pages/UpdateProfile';
import BookDetails from './components/BookDetails';
import BorrowedBooks from './components/BorrowedBooks ';
import Details from './components/Details';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5007/api/getbook');
                setData(result.data.books);
            } catch (error) {
                console.error('There was an error fetching the book data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/editprofile" element={<UpdateProfile />} />
                <Route path="/books" element={<Books data={data} setData={setData} />} />
                <Route path="/addBooks" element={<AddBooks setData={setData} />} />
                <Route path="/updatebook/:id" element={<Update data={data} setData={setData} />} />
                <Route path="/userbooks" element={<UserBooks />} />
                <Route path="/bookdetails/:id" element={<BookDetails />} />
                <Route path="/borrow-books" element={<BorrowedBooks />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/borrowedby/:UserId" element={<UserList />} />


                
            </Routes>
        </Router>
    );
}

export default App;
