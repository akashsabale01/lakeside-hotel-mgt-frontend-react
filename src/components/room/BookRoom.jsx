import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBookedRoom } from '../../services/RoomService';

const BookRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { room } = location.state;

    const [formData, setFormData] = useState({
        guestFullName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: 0,
        numOfChildren: 0
    });
    // roomId: room.roomId
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {hy
    //         await axios.post('https://localhost:7136/api/bookings', formData);
    //         alert('Booking Successful!');
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error booking room:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addBookedRoom(room.roomId, formData);
            console.log(`Book with room id = ${room.roomId} booked succesfully with api response-> `, response);

            alert(response); // Or handle the response as needed

        } catch (error) {
            console.error('Error adding booked room:', error);
        }
    };


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Book Room: {room.name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Guest Full Name</label>
                    <input type="text" className="form-control" name="guestFullName" value={formData.guestFullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Guest Email</label>
                    <input type="email" className="form-control" name="guestEmail" value={formData.guestEmail} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>CheckIn Date</label>
                    <input type="date" className="form-control" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>CheckOut Date</label>
                    <input type="date" className="form-control" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Number of Adults</label>
                    <input type="number" className="form-control" name="numOfAdults" value={formData.numOfAdults} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Number of Children</label>
                    <input type="number" className="form-control" name="numOfChildren" value={formData.numOfChildren} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Book Room</button>
            </form>
        </div>
    );
};

export default BookRoom;
