import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllRooms } from '../../services/RoomService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

    const navigate = useNavigate();

    const fetchAndFilterRooms = async () => {
        try {
            const response = await getAllRooms();
            console.log('Fetched Rooms:', response); // Debug: log the fetched rooms
            let filtered = response;

            if (roomTypeFilter) {
                filtered = filtered.filter(room => room.name.toLowerCase() === roomTypeFilter.toLowerCase());
            }

            if (priceFilter) {
                filtered = filtered.filter(room => room.price <= parseInt(priceFilter));
            }

            setRooms(response);
            setFilteredRooms(filtered);

            console.log('Room Type Filter:', roomTypeFilter); // Debug: log the room type filter value
            console.log('Filtered Rooms:', filtered); // Debug: log the filtered rooms
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchAndFilterRooms();
    }, [roomTypeFilter, priceFilter]);

    const handleBook = (room) => {
        navigate(`/book-room/${room.roomId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                    <h3 className='text-muted mb-3'>Filter Rooms</h3>
                <div className="col-md-4">
                    <label className='text-muted mb-1'>Filter By Type</label>
                    <select className="form-control" value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
                        <option value="">All Rooms</option>
                        <option value="single room">Single Room</option>
                        <option value="double room">Double Room</option>
                        {/* Add other room types as needed */}
                    </select>
                </div>
                <div className="col-md-4">
                    <label className='text-muted mb-1'>Filter By Max Price</label>
                    <input type="number" className="form-control" placeholder="Enter Max Price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
                </div>
            </div>
            <div className="row">
            <h3 className='text-muted mb-3'>Available Rooms</h3>
                {filteredRooms.map(room => (
                    <div key={room.roomId} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={`data:image/jpeg;base64,${room.image}`} alt={room.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{room.name}</h5>
                                <p className="card-text">{room.description}</p>
                                <p className="card-text"><strong>Capacity:</strong> {room.capacity} Guests</p>
                                <p className="card-text"><strong>Price:</strong> ₹{room.price}</p>
                                <button className="btn btn-warning" onClick={() => handleBook(room)}>Book</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;

    /*

    Below is Fetch Room Response type

        [
    {
        "roomId": 1,
        "name": "Single Room",
        "description": "Room for 2 person",
        "capacity": 2,
        "price": 5000,
        "image": "/9j/4AAQSkZJRgABAgEASABIAAD/"
        "imageName": "pexels-pixabay-210265.jpg",
        "bookedRooms": null
    }
]
        
        */
