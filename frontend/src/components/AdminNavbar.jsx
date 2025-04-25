import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './AdminNavbar.css';

export const AdminNavbar = ({ userId }) => {
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    
    
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(`/api/getuser/${userId}`);
                setProfileImage(response.data.profileImage || '/default-profile.png');
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileImage();
    }, [userId]);

   


    return (
        <div style={{ borderBottom: "3px solid white" }}>
            <nav className="navbar navbar-expand-lg bg-dark w-100">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/adminhome">LibraFusion</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="search-form ms-auto" role="search">
                            <input className="form-control search-input" type="search" placeholder="Search here" aria-label="Search" />
                            <button className="btn search-btn" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                <img
                                    src={profileImage}
                                    alt=""
                                    className="rounded-circle"
                                    height="40"
                                />
                                <button className="dropbtn">
                                    <i className="fas fa-user"></i>
                                </button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/addBooks">Add Book</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/home">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    );
};

