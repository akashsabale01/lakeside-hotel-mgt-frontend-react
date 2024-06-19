import React, { useState, useEffect } from "react";
import { getAllBookedRooms } from "../../services/BookedRoomService";
import "bootstrap/dist/css/bootstrap.min.css";

const BookedRoomsList = () => {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllBookedRooms();
    console.log("🚀 ~ fetchData ~ data:", data);
    setBookedRooms(data);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Booked Rooms</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-responsive">
          <thead className="table-primary">
            <tr>
              <th>Booking ID</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Guest Full Name</th>
              <th>Guest Email</th>
              <th>Number of Adults</th>
              <th>Number of Children</th>
              <th>Total Number of Guests</th>
              <th>Booking Confirmation Code</th>
              <th>Room ID</th>
            </tr>
          </thead>
          <tbody>
            {bookedRooms.map((room) => (
              <tr key={room.bookingId}>
                <td>{room.bookingId}</td>
                <td>{new Date(room.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(room.checkOutDate).toLocaleDateString()}</td>
                <td>{room.guestFullName}</td>
                <td>{room.guestEmail}</td>
                <td>{room.numOfAdults}</td>
                <td>{room.numOfChildren}</td>
                <td>{room.totalNumOfGuest}</td>
                <td>{room.bookingConfirmationCode}</td>
                <td>{room.roomId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedRoomsList;

/*
    [
    {
        "bookingId": 1,
        "checkInDate": "2024-06-19T00:00:00",
        "checkOutDate": "2024-06-22T00:00:00",
        "guestFullName": "Maria Deo",
        "guestEmail": "maria@gmail.com",
        "numOfAdults": 1,
        "numOfChildren": 1,
        "totalNumOfGuest": 2,
        "bookingConfirmationCode": "Mar20240619",
        "roomId": 1,
        "room": null
    }
]



*/
