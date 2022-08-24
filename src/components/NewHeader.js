import React, { useState } from "react";

const NewHeader = () => {
  return (
    <div className="py-6 lg:py-8">
      <div
        className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between justify-spacearound"
        style={{ justifyContent: " space-around" }}
      >
        <div>
          <p className="flex items-center text-indigo-700 text-xs">
            <span>Portal</span>
            <span className="mx-2">&gt;</span>
            <span>Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span>KPIs</span>
          </p>
          <h4 className="text-2xl font-bold leading-tight text-black ">
            Dashboard
          </h4>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            className="mr-3 bg-gray-400 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-gray-300 text-indigo-700  dark:text-indigo-600 px-5 py-2 text-sm"
            style={{ position: "absolute", left: "83%" }}
          >
            Back
          </button>
          <button
            className="transition focus:outline-none duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            style={{ position: " absolute", left: " 90%" }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewHeader;
