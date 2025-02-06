import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase className="text-4xl text-green-600" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-4xl text-blue-600" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-4xl text-purple-600" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-4xl text-yellow-600" />,
    },
  ];
  return (
    <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">Find a job that suits</h1>
          <h1 className="text-4xl font-bold text-green-600 leading-tight">your interests and skills</h1>
          <p className="text-gray-700 mt-4 text-lg">
            Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding
            careers.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src="/heroS1.png" alt="hero" className="w-full max-w-lg rounded-lg " />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 container mx-auto px-6 md:px-12">
        {details.map((element) => (
          <div
            key={element.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{element.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{element.title}</p>
            <p className="text-gray-600 text-lg">{element.subTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
