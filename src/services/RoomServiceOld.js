import axios from 'axios';

export const getAllRooms = async () => {
    const response = await axios.get('https://localhost:7136/api/room');
    return response.data;
};

export const getRoomById = async (id) => {
    const response = await axios.get(`https://localhost:7136/api/room/${id}`);
    return response.data;
};

export const updateRoom = async (id, roomData) => {
    const formData = new FormData();
    formData.append('name', roomData.name);
    formData.append('description', roomData.description);
    formData.append('capacity', roomData.capacity);
    formData.append('price', roomData.price);
    if (roomData.imageFile) {
        formData.append('imageFile', roomData.imageFile);
    }

    await axios.put(`https://localhost:7136/api/room/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const API_URL = 'https://localhost:7136/api/bookedroom';
export const getAllBookedRooms = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getBookedRoomById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addBookedRoom = async (roomId, bookedRoom) => {
    const response = await axios.post(`${API_URL}/add?roomId=${roomId}`, bookedRoom);
    return response.data;
};

export const updateBookedRoom = async (id, bookedRoom) => {
    const response = await axios.put(`${API_URL}/${id}`, bookedRoom);
    return response.data;
};

export const deleteBookedRoom = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
