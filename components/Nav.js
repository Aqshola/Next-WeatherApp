import { useState } from "react";

export default function Nav() {
  const currentDate = Intl.DateTimeFormat("en-ID", {
    weekday: "short",
    hour: "numeric",
  }).format(new Date());

  const locateSuccess = (pos) => {
    return pos;
  };

  const locateFail = (err) => {
    alert(err.message);
    console.log(err);
  };

  const _getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locateSuccess, locateFail, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("error");
    }
  };
  return (
    <div className="w-full flex space-x-5  items-center p-5 z-10">
      <div className="flex space-x-10 flex-grow items-center">
        <input
          type="text"
          placeholder="Search City"
          className="p-2 focus:outline-none bg-gray-100 rounded-md w-56 "
        />
      </div>
      <div className="flex items-center space-x-4">
        <h2>{currentDate}</h2>
        <button className="focus:outline-none" onClick={_getLocation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="2em"
            height="2em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
