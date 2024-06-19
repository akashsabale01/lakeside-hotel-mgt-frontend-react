import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import Home from "./components/homepage/Home";
import Footer from "./components/layout/Footer";
import Admin from "./components/admin/Admin";
import AddBookedRoom from "./components/room/AddBookedRoomOld";
import BookRoom from "./components/room/BookRoom";
import Login from "./components/auth/Login";
import { useEffect, useState } from "react";
import authServiceInstance from "./services/AuthService";
import NavBar from "./components/layout/Navbar";

import { toast } from "react-toastify";
import Register from "./components/auth/Register";
import RoomList from "./components/room/RoomList";
import BookedRoomsList from "./components/room/BookedRoomsList";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authServiceInstance.getToken();

    if (token) {
      const user = authServiceInstance.getUserFromToken(token);
      setUser(user);
    }
  }, []);

  const register = async (name, email, password, address, phone) => {
    try {
      const registerData = await authServiceInstance.register(
        name,
        email,
        password,
        address,
        phone
      );
      console.log("registerApiResponse ->", registerData);
      toast.success("Registration Successful");
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Error while Registering", error);
    }
  };

  const login = async (email, password) => {
    const token = await authServiceInstance.login(email, password);
    const userData = authServiceInstance.getUserFromToken(token);
    console.log("user in app.jsx => ", userData);
    setUser(userData);
    toast.success("Login Successful");
  };

  const logout = () => {
    authServiceInstance.logout();
    setUser(null);
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <NavBar user={user} logout={logout} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register register={register} />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/edit-room" element={<EditRoom />} />
        <Route path="/edit-room/:id" element={<EditRoom />} />
        <Route path="/room-list" element={<RoomList />} />

        <Route path="/add-booking" element={<AddBookedRoom />} />

        {/* below - working components */}
        <Route path="/book-room/:roomId" element={<BookRoom />} />
        <Route path="/booked-room-list" element={<BookedRoomsList />} />
        <Route path="/find-booking" element={<BookedRoomsList />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
