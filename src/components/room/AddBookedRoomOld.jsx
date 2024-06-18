import React, { useState } from 'react';
import { addBookedRoom } from '../../services/BookedRoomService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBookedRoomOld = () => {
    const [roomId, setRoomId] = useState('');
    const [bookedRoom, setBookedRoom] = useState({
        guestFullName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: 0,
        numOfChildren: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookedRoom({
            ...bookedRoom,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addBookedRoom(roomId, bookedRoom);
            alert(response); // Or handle the response as needed
        } catch (error) {
            console.error('Error adding booked room:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add Booked Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="roomId" className="form-label">Room ID</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="roomId" 
                        name="roomId" 
                        value={roomId} 
                        onChange={e => setRoomId(e.target.value)} 
                        placeholder="Room ID" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="guestFullName" className="form-label">Guest Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="guestFullName" 
                        name="guestFullName" 
                        value={bookedRoom.guestFullName} 
                        onChange={handleChange} 
                        placeholder="Guest Full Name" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="guestEmail" className="form-label">Guest Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="guestEmail" 
                        name="guestEmail" 
                        value={bookedRoom.guestEmail} 
                        onChange={handleChange} 
                        placeholder="Guest Email" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="checkInDate" className="form-label">Check-In Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="checkInDate" 
                        name="checkInDate" 
                        value={bookedRoom.checkInDate} 
                        onChange={handleChange} 
                        placeholder="Check-In Date" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="checkOutDate" className="form-label">Check-Out Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="checkOutDate" 
                        name="checkOutDate" 
                        value={bookedRoom.checkOutDate} 
                        onChange={handleChange} 
                        placeholder="Check-Out Date" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numOfAdults" className="form-label">Number of Adults</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="numOfAdults" 
                        name="numOfAdults" 
                        value={bookedRoom.numOfAdults} 
                        onChange={handleChange} 
                        placeholder="Number of Adults" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numOfChildren" className="form-label">Number of Children</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="numOfChildren" 
                        name="numOfChildren" 
                        value={bookedRoom.numOfChildren} 
                        onChange={handleChange} 
                        placeholder="Number of Children" 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Booked Room</button>
            </form>
        </div>
    );
};

export default AddBookedRoomOld;
