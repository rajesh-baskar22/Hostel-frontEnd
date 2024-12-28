// import React from "react";
import { useNavigate } from "react-router-dom";
import roomimage1 from "../assets/roomimage1.webp"

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`book-room/${room._id}`);
  };

  return (
    <div className="w-[300px] bg-yellow-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-4">
      {/* Room status and number */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h2>
        <span className={`px-2 py-1 text-xs rounded-full ${
          room.availabilityStatus === "Available" 
            ? "bg-green-100 text-green-600" 
            : "bg-red-100 text-red-600"
        }`}>
          {room.availabilityStatus}
        </span>
      </div>

      {/* Room details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{room.type}</span>
          <span>{room.occupied} / {room.capacity}</span>
        </div>

        {/* Features */}
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs ${
            room.features.AC ? "bg-violet-50 text-green-700" : "bg-gray-50 text-gray-600"
          }`}>
            {room.features.AC ? "AC" : "No AC"}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${
            room.features.WIFI ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-600"
          }`}>
            {room.features.WIFI ? "WiFi" : "No WiFi"}
          </span>
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={handleBookClick}
        disabled={room.availabilityStatus === "Occupied"}
        className={`w-full mt-3 py-2 rounded text-sm font-medium transition-all duration-300 ${
          room.availabilityStatus === "Occupied"
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {room.availabilityStatus === "Occupied" ? "Occupied" : "Book Now"}
      </button>
    </div>
  </div>
  );
};

import PropTypes from 'prop-types';

RoomCard.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roomNumber: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    occupied: PropTypes.number.isRequired,
    availabilityStatus: PropTypes.string.isRequired,
    features: PropTypes.shape({
      AC: PropTypes.bool.isRequired,
      WIFI: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RoomCard;