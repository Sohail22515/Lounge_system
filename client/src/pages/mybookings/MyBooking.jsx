import "./myBookings.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/bookings/user/${user._id}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
      setLoading(false);
    };

    if (user) fetchBookings();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="myBookingsContainer">
        <h1>My Bookings</h1>
        {loading ? (
          <p>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="myBookingsList">
            {bookings.map((booking) => (
              <div className="myBookingCard" key={booking._id}>
                <h3>{booking.occasion}</h3>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Services:</strong> {booking.services.join(", ")}</p>
                <p><strong>Generator Backup:</strong> {booking.generatorBackup}</p>
                <p><strong>Furniture:</strong> {booking.additionalFurniture}</p>
                <p><strong>Lighting:</strong> {booking.additionalLighting}</p>
                <p><strong>Waiters:</strong> {booking.additionalWaiters}</p>
                <p><strong>Catering:</strong> {booking.catering}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
