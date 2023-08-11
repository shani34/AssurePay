import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch welcome message from the backend
        fetch('/api/welcome', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{message}</p>
        </div>
    );
}

export default Dashboard;
