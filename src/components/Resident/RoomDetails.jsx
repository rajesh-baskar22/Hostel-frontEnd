import  { useEffect, useState } from "react";
import API from "../../api/axios";
import {useNavigate} from "react-router-dom"
import {
  HomeIcon,
  CalendarIcon,
  CreditCardIcon,
  UsersIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";


  function RoomDetails({ residentId }) {
    const [roomDetails, setRoomDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [rendered, setRendered] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    
    // Navigate hook
    const navigate = useNavigate();
    useEffect(() => {
      const fetchResidentRoomDetails = async () => {
        try {
          const response = await API.get(`/resident/room/${residentId}`);
          console.log(response.data);
          setRoomDetails(response.data.roomDetails);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
  
          setTimeout(() => setRendered(true), 1000); 
        }
      };
  
      fetchResidentRoomDetails();
      setLoading(false);
      setTimeout(() => setRendered(true), 100); 
  
      setInterval(updateDate, 1000);
    }, [residentId]);
  
    const updateDate = () => {
      setCurrentDate(
        new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
  
    if (loading) {
      return (
        <div className="h-fit bg-gradient-to-br from-red-50 to-blue-50 p-8">
          <div className="mx-auto max-w-4xl">
            <div className="h-12 w-64 mb-8 bg-zinc-200 animate-pulse rounded"></div>
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 w-full bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-red-200 to-blue-50 p-8 transition-opacity duration-500 ${
          rendered ? "opacity-100" : "opacity-0"
        }`}
      >
        <>
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-1">Hello {"User"} Welcome to VistaHostel</h3>
            {/* Real-time date and time display */}
            <p className="text-gray-500 mb-4">{currentDate}</p>
            <hr />
          </div>
          {roomDetails.roomNumber ? (
            <>
              <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                  Your Room Details
                </h1>
  
                <div className="grid gap-6 md:grid-cols-2">
                  <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      rendered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6">
                      <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                        <HomeIcon className="h-7 w-7 text-blue-600" />
                        Room Information
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-medium text-gray-800">
                          Room {roomDetails.roomNumber}
                        </p>
                        <span className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full shadow-sm">
                          {roomDetails.roomStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <UserGroupIcon className="h-5 w-5 text-gray-500" />
                        <p className="text-lg">
                          Occupancy: {roomDetails.roomOccupancy}
                        </p>
                      </div>
                    </div>
                  </div>
  
                  <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      rendered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    <div className="bg-yellow-100 p-4">
                      <h2 className="flex items-center text-xl font-semibold text-gray-800">
                        <CalendarIcon className="h-6 w-6 text-yellow-500" />
                        Stay Duration
                      </h2>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600">
                        Check In:{" "}
                        <span className="font-semibold text-yellow-800">
                          {new Date(roomDetails.checkInDate).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="mt-2 text-gray-600">
                        Check Out:{" "}
                        <span className="font-semibold text-yellow-800">
                          {new Date(
                            roomDetails.checkOutDate
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
  
                  <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      rendered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <div className="bg-pink-100 p-4">
                      <h2 className="flex items-center text-xl font-semibold text-gray-800">
                        <CreditCardIcon className="h-6 w-6 text-pink-500" />
                        Fees
                      </h2>
                    </div>
                    <div className="p-4">
                      <p className="text-2xl font-bold text-pink-600">
                        ${roomDetails.roomFees}
                      </p>
                      <p className="mt-1 text-gray-600">per month</p>
                    </div>
                  </div>
  
                  <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      rendered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    <div className="bg-pink-100 p-4">
                      <h2 className="flex items-center text-xl font-semibold text-gray-800">
                        <UsersIcon className="h-6 w-6 text-pink-500" />
                        Amenities
                      </h2>
                    </div>
                    <div className="p-4">
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Free Wi-Fi</li>
                        <li>Air Conditioning</li>
                        <li>Daily Housekeeping</li>
                        <li>24/7 Security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">                <button
                  onClick={() => navigate(`/resident/invoice/${residentId}`)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <h1>No Room assigned</h1>
          )}
        </>
      </div>
    );
  }
import PropTypes from 'prop-types';

RoomDetails.propTypes = {
  residentId: PropTypes.string,
};
  
  export default RoomDetails;
  