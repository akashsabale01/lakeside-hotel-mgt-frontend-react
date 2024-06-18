import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRoom from './components/room/AddRoom';
import EditRoom from './components/room/EditRoom';
import Home from './components/homepage/Home';
import Footer from './components/layout/Footer';
import Admin from './components/admin/Admin';
import AddBookedRoom from './components/room/AddBookedRoomOld';
import BookRoom from './components/room/BookRoom';
import Login from './components/auth/Login';
import { useEffect, useState } from 'react';
import authServiceInstance from './services/AuthService';
import NavBar from './components/layout/Navbar';

import { toast } from 'react-toastify';
import Register from './components/auth/Register';
import RoomList from './components/room/RoomList';


function App() {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = authServiceInstance.getToken();
  
      if (token) {
        const user = authServiceInstance.getUserFromToken(token);
        setUser(user);
      }
    }, []);

    const register = async (name, email, password, address, phone)=>{
      try{
        const registerData = await authServiceInstance.register(name, email, password, address, phone);
        console.log("registerApiResponse ->",registerData);
        toast.success("Registration Successful");
      }
      catch(error){
        toast.error("Registration Failed");
        console.error('Error while Registering', error);
      }
    }

    const login = async (email, password) => {
        // try {
        //   const token = await authServiceInstance.login(email, password);
        //   const userData = authServiceInstance.getUserFromToken(token);
        //   console.log("user in app.jsx => ", userData);
        //   setUser(userData);
        //   toast.success("Login Successful");
        // } catch (error) {
        //   navigate("/login");
        //   toast.error("Login Failed");
        //   console.error('Error logging in', error);
        // }
        const token = await authServiceInstance.login(email, password);
        const userData = authServiceInstance.getUserFromToken(token);
        console.log("user in app.jsx => ", userData);
        setUser(userData);
        toast.success("Login Successful");
      };
    
      const logout = () => {
        authServiceInstance.logout();
        setUser(null);
        toast.success("Logout Successful")
      };


    return (
        <main>
            <Router>
                <div className='d-flex flex-column justify-content-center'>
                    <NavBar  user={user} logout={logout} />

                    <Routes>
                        <Route path="/login" element={<Login login={login} />} />
                        <Route path="/register" element={<Register register={register}/>} />
                        <Route path="/" element={<Home user={user} />} />
                        <Route path="/add-room" element={<AddRoom />} />
                        <Route path="/edit-room" element={<EditRoom />} />
                        <Route path="/edit-room/:id" element={<EditRoom />} />
                        <Route path="/room-list" element={<RoomList />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/add-booking" element={<AddBookedRoom />} />
                        <Route path="/find-booking" element={<h2>Find Booking Component</h2>} /> {/* Placeholder for find booking */}
                        <Route path="/book-room" element={<BookRoom />} />
                    
                    </Routes>

                    <Footer />
                </div>
            </Router>


        </main>
    );
}

export default App;
