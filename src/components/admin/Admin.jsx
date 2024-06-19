import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <div>
        <h2>Welcome to Admin Panel</h2>
        <hr />
        <ul>
          <li>
            <Link to={"/add-room"}>Add Room</Link>
          </li>
          <li>
            <Link to={"/add-room"}>Manage Rooms</Link>
          </li>
          <li>
            <Link to={"/add-room"}>Manage Booking</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Admin;
