import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBookedRoom } from '../../services/BookedRoomService';
import { toast } from 'react-toastify';

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addBookedRoom(room.roomId, formData);
            console.log(`Book with room id = ${room.roomId} booked succesfully with api response-> `, response);

            toast.success(`Booked room with id = ${room.roomId} succesfully`);
            navigate("/booked-room-list");
            // alert(response); // Or handle the response as needed

        } catch (error) {
            console.error('Error adding booked room:', error);
            navigate("/book-room");
            toast.error("Error while booking the room");
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
                    <label>Check-In Date</label>
                    <input type="date" className="form-control" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Check-Out Date</label>
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
