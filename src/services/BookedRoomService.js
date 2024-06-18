import axios from 'axios';

const API_URL = 'https://localhost:7136/api';

const authServiceInstance = {
  getToken() {
    return localStorage.getItem('token');
  }
};

export const getAllBookedRooms = async () => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.get(`${API_URL}/bookedroom`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booked rooms:', error);
    throw error;
  }
};

export const getBookedRoomById = async (id) => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.get(`${API_URL}/bookedroom/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching booked room with ID ${id}:`, error);
    throw error;
  }
};

export const addBookedRoom = async (roomId, bookedRoom) => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.post(`${API_URL}/bookedroom/add?roomId=${roomId}`, bookedRoom, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding booked room:', error);
    throw error;
  }
};

export const updateBookedRoom = async (id, bookedRoom) => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.put(`${API_URL}/bookedroom/${id}`, bookedRoom, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating booked room with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBookedRoom = async (id) => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.delete(`${API_URL}/bookedroom/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting booked room with ID ${id}:`, error);
    throw error;
  }
};

    