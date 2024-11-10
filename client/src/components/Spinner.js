import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-indigo-600"></div>
    </div>
  );
};

export default Spinner;
