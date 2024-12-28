// import React from "react";


import PropTypes from 'prop-types';

function InfoContainer({ value, title, icon }) {
  return (
    <div
      className={`relative w-48 h-36 border-2 flex rounded-2xl p-2 m-2 bg-gradient-to-r items-end from-blue-600 from-30% to-blue-400 to-100% text-white hover:scale-105 transition-all duration-300 shadow-lg`}
    >
      <p className="absolute bottom-4 left-5 text-4xl">{value}</p>
      <p className="text-xl absolute left-3 top-14 uppercase">{title}</p>
      <span className="absolute right-0 bottom-10 opacity-70">
        {/* Main Icon */}
        {icon}
      </span>
    </div>  );
}

InfoContainer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default InfoContainer;

