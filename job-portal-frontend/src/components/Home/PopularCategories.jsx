import React from "react";
import { MdCleaningServices, MdConstruction, MdFastfood, MdDeliveryDining } from "react-icons/md";
import { FaUserTie, FaTruckMoving, FaRecycle, FaConciergeBell } from "react-icons/fa";
import { GiGardeningShears, GiMechanicGarage } from "react-icons/gi";
import { FaScissors } from "react-icons/fa6";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Home Services",
      subTitle: "Explore a variety of home services with numerous job opportunities in House keeping, Childcare, and Elderly Care.",
      icon: <MdCleaningServices className="text-4xl text-blue-600" />,
    },
    {
      id: 2,
      title: "Construction and Maintenance",
      subTitle: "Find jobs in construction and maintenance, including Plumbing, Electrical works, and site management roles.",
      icon: <MdConstruction className="text-4xl text-yellow-600" />,
    },
    {
      id: 3,
      title: "Hospitality and Catering",
      subTitle: "Explore job opportunities in hospitality and catering, including waitstaff, chefs, and Bartender.",
      icon: <FaConciergeBell className="text-4xl text-red-600" />,
    },
    {
      id: 4,
      title: "Transportation and Delivery",
      subTitle: "Find jobs in transportation and delivery, including drivers, couriers, and logistics coordination opportunities.",
      icon: <MdDeliveryDining className="text-4xl text-green-600" />,
    },
    {
      id: 5,
      title: "Agriculture and Farming",
      subTitle: "Explore job opportunities in agriculture and farming, including crop management, harvesting, and animal care roles.",
      icon: <GiGardeningShears className="text-4xl text-teal-600" />,
    },
    {
      id: 6,
      title: "Repairs and Maintenance",
      subTitle: "Find jobs in repairs and maintenance, including mechanics, Appliance Repair,Mobile Phone Repair,Computer/Laptop Repair,Furniture Repair",
      icon: <GiMechanicGarage className="text-4xl text-gray-600" />,
    },
    {
      id: 7,
      title: "Waste Management and Recycling",
      subTitle: "Discover job opportunities in waste management and recycling, including sorting, collection, and environmental conservation roles",
      icon: <FaRecycle className="text-4xl text-indigo-600" />,
    },
    {
      id: 8,
      title: "Skilled Labor",
      subTitle: "Explore skilled labor job opportunities in construction, Machine Operation,Fabrication,Crane Operation",
      icon: <FaUserTie className="text-4xl text-purple-600" />,
    },
    {
      id: 9,
      title: "Tailoring and Crafting",
      subTitle: "Find jobs in tailoring and crafting, including sewing, custom designs, and handcraft creation roles.",
      icon: <FaScissors className="text-4xl text-[#8B4513]" />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((element) => (
            <div
              key={element.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{element.icon}</div>
              <p className="text-xl font-semibold">{element.title}</p>
              <p className="text-gray-600 mt-2">{element.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
