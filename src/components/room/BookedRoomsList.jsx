import React, { useState, useEffect } from 'react';
import { getAllBookedRooms } from '../../services/BookedRoomService';

const BookedRoomsList = () => {
    const [bookedRooms, setBookedRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllBookedRooms();
            setBookedRooms(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Booked Rooms</h1>
            <ul>
                {bookedRooms.map(room => (
                    <li key={room.bookingId}>
                        Room ID: {room.roomId}, Guest: {room.guestFullName}, Check-in: {room.checkInDate}, Check-out: {room.checkOutDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookedRoomsList;
