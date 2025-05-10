import React from "react";

const ResumeModel = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="Resume"
            className="max-h-[80vh] w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModel;
