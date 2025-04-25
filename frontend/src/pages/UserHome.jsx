import React, { useEffect, useState } from 'react';
import "./UserHome.css";
import { UserNavbar } from '../components/UserNavbar';
import { Link } from 'react-router-dom';
function UserHome() {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500); 
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        <UserNavbar />
        <div className={`userhome-container ${loaded ? 'loaded' : ''}`}>
          <div className="userhome-content">
            <h1>Ready to be part of our Community of Books</h1>
            <h1 className='usermeet'>"LibraFusion"</h1>
            <p> Find and read more books to enrich your knowledge. Our online library offers a wide range of books, journals, and resources to help you learn and grow. </p>
            <Link to={"/userbooks"} className='viewBook'>View Books</Link>
          </div>
        </div>
        
      </div>
    );
  }
  
  export default UserHome;
