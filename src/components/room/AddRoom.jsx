import React, { useState } from 'react';
import { postRoom } from '../../services/RoomService'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddRoom.css';

const AddRoom = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [price, setPrice] = useState(0.0);
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [addedRoom, setAddedRoom] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const roomData = {
            name,
            description,
            capacity,
            price,
            imageFile
        };

        try {
            const response = await postRoom(roomData);
            setAddedRoom(response);
            setMessage('Room added successfully!');
            // Reset form
            setName('');
            setDescription('');
            setCapacity(1);
            setPrice(0.0);
            setImageFile(null);
            setPreviewImage(null);
        } catch (error) {
            setMessage('Error adding room: ' + error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="card p-4">
                        <h2 className="card-title text-center mb-4">Add New Room</h2>
                        {message && <p className="alert alert-info">{message}</p>}
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Capacity</label>
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                required
                                className="form-control"
                            />
                            {previewImage && <img src={previewImage} alt="Preview" className="img-thumbnail mt-3" />}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add Room</button>
                    </form>
                </div>
            </div>
            {addedRoom && (
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Added Room Details</h2>
                                <div className="card-text">
                                    <p><strong>Name:</strong> {addedRoom.name}</p>
                                    <p><strong>Description:</strong> {addedRoom.description}</p>
                                    <p><strong>Capacity:</strong> {addedRoom.capacity}</p>
                                    <p><strong>Price:</strong> ₹{addedRoom.price}</p>
                                    {addedRoom.image && (
                                        <img src={`data:image/jpeg;base64,${addedRoom.image}`} alt="Room" className="img-fluid mt-3" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddRoom;
