import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBookedRoom } from "../../services/BookedRoomService";
import { toast } from 'react-toastify';
import { getRoomById } from "../../services/RoomService";

const BookRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guestFullName, setGuestFullName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [numOfAdults, setNumOfAdults] = useState(1);
    const [numOfChildren, setNumOfChildren] = useState(0);

    useEffect(() => {
        fetchRoomName();
    }, [roomId]);

    const fetchRoomName = async () => {
        try {
            const room = await getRoomById(roomId);
            console.log("🚀 ~ fetchRoomName ~ room:", room)
            setRoomName(room.name);
        } catch (error) {
            console.error(`Error fetching room details for room ID ${roomId}:`, error);
            toast.error(`Error fetching room details for room ID ${roomId}`);
            
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            toast.error('Check-in date must be before check-out date');
            return;
        }

        const bookedRoomData = {
            checkInDate,
            checkOutDate,
            guestFullName,
            guestEmail,
            numOfAdults,
            numOfChildren,
        };

        try {
            await addBookedRoom(roomId, bookedRoomData);
            toast.success('Room booked successfully!');
            navigate('/booked-room-list');
        } catch (error) {
            toast.error(`Error booking room: ${error.response?.data || error.message}`);
            navigate(`/book-room/${roomId}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="card p-4">
                        <h2 className="card-title text-center mb-4">Book {roomName}</h2>
                        <div className="form-group mb-3">
                            <label>Check-in Date</label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Check-out Date</label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Guest Full Name</label>
                            <input
                                type="text"
                                value={guestFullName}
                                onChange={(e) => setGuestFullName(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Guest Email</label>
                            <input
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Number of Adults</label>
                            <input
                                type="number"
                                value={numOfAdults}
                                onChange={(e) => setNumOfAdults(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Number of Children</label>
                            <input
                                type="number"
                                value={numOfChildren}
                                onChange={(e) => setNumOfChildren(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Book Room</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookRoom;
