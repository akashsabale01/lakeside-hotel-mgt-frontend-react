import axios from 'axios';

const API_URL = 'https://localhost:7136/api';

const authServiceInstance = {
  getToken() {
    return localStorage.getItem('token');
  }
};

export const getAllRooms = async () => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.get(`${API_URL}/room`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error; // Re-throw the error to handle it in components if needed
  }
};

export const getRoomById = async (id) => {
  const token = authServiceInstance.getToken();
  try {
    const response = await axios.get(`${API_URL}/room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  const token = authServiceInstance.getToken();
  try {
    const formData = new FormData();
    formData.append('name', roomData.name);
    formData.append('description', roomData.description);
    formData.append('capacity', roomData.capacity);
    formData.append('price', roomData.price);
    if (roomData.imageFile) {
      formData.append('imageFile', roomData.imageFile);
    }

    const response = await axios.put(`${API_URL}/room/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating room with ID ${id}:`, error);
    throw error;
  }
};

export const postRoom = async (roomData) => {
  const token = authServiceInstance.getToken();
  try {
    const formData = new FormData();
    formData.append('name', roomData.name);
    formData.append('description', roomData.description);
    formData.append('capacity', roomData.capacity);
    formData.append('price', roomData.price);
    formData.append('imageFile', roomData.imageFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(`${API_URL}/room`, formData, config);
    return response.data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};


// BookedRoom Data Fetching

// export const getAllBookedRooms = async () => {
//   const token = authServiceInstance.getToken();
//   try {
//     const response = await axios.get(`${API_URL}/bookedroom`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching booked rooms:', error);
//     throw error;
//   }
// };

// export const getBookedRoomById = async (id) => {
//   const token = authServiceInstance.getToken();
//   try {
//     const response = await axios.get(`${API_URL}/bookedroom/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching booked room with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const addBookedRoom = async (roomId, bookedRoom) => {
//   const token = authServiceInstance.getToken();
//   try {
//     const response = await axios.post(`${API_URL}/bookedroom/add?roomId=${roomId}`, bookedRoom, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding booked room:', error);
//     throw error;
//   }
// };

// export const updateBookedRoom = async (id, bookedRoom) => {
//   const token = authServiceInstance.getToken();
//   try {
//     const response = await axios.put(`${API_URL}/bookedroom/${id}`, bookedRoom, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating booked room with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const deleteBookedRoom = async (id) => {
//   const token = authServiceInstance.getToken();
//   try {
//     const response = await axios.delete(`${API_URL}/bookedroom/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting booked room with ID ${id}:`, error);
//     throw error;
//   }
// };

    