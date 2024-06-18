import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7136/api/Auth'; // Adjust the URL as necessary

class AuthService {

  async register(name, email, password, address, phone) {
    const response = await axios.post(`${API_URL}/register`, { name,email,address,phone, password });

    const registerApiResponse = response.data;

    return registerApiResponse;
  }

  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    if (AuthService.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserFromToken(token) {
    return jwtDecode(token);
  }

  static isLocalStorageAvailable() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
//export default new AuthService();