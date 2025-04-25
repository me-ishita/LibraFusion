import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ UserId }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5007/api/books/borrowedby/${UserId}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [UserId]);

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">Users Who Borrowed This Book</h2>
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user.userId._id} className="user-card">
                        <p className="user-info"><strong>Username:</strong> {user.userId.username}</p>
                        <p className="user-info"><strong>Email:</strong> {user.userId.email}</p>
                        <div className="user-actions">
                            <button className="btn btn-edit">Edit</button>
                            <button className="btn btn-delete">Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No users have borrowed this book yet.</p>
            )}
        </div>
    );
};

export default UserList;
