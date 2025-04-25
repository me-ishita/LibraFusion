import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`home-container ${loaded ? 'loaded' : ''}`}>
        <div className="home-content">
          <h1>Welcome to Our Online Library</h1>
          <h1 className='meet'>"Welcome to LibraFusion, where knowledge meets innovation. Explore our extensive collection and enrich your learning journey."</h1>
          <p>
            Discover a world of knowledge at your fingertips. Join us today and start your journey of discovery.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

