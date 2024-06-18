import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookRoomOld = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { room } = location.state;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        roomId: room.roomId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7136/api/bookings', formData);
            alert('Booking Successful!');
            navigate('/');
        } catch (error) {
            console.error('Error booking room:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Book Room: {room.name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Book</button>
            </form>
        </div>
    );
};

export default BookRoomOld;
