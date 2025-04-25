import React, { useEffect, useState } from 'react';
import "./AdminHome.css";
import { AdminNavbar } from '../components/AdminNavbar';
import { Link } from 'react-router-dom';
function AdminHome() {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500); 
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        <AdminNavbar />
        <div className={`adminhome-container ${loaded ? 'loaded' : ''}`}>
          <div className="adminhome-content">
            <h1>LIBRARY ACCESS</h1>
            <h1 className='adminmeet'>FOR YOU</h1>
            <p className='check'> Check Out the books from here </p>
            <Link to={"/books"} className='viewBook'>View Books</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminHome;

  