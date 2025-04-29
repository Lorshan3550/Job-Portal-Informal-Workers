import React from "react";
import Footer from "../Layout/Footer"; // Make sure to import Footer if you need it

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (Fixed at the top) */}
      {/* <nav className="bg-green-800 text-white fixed top-0 left-0 w-full z-10 py-4">
      </nav> */}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 text-center pt-16 px-4 mt-0">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* About Us Heading */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-black mb-4">ABOUT US</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to JOBSPHERE! We are a leading platform connecting job
              seekers and employers with ease. Our mission is to provide a
              seamless experience for both job hunters and employers looking for
              the best talent.
            </p>
          </section>

          {/* Content Box 1 */}
          <section className="flex flex-col lg:flex-row items-center gap-8 mb-8">
            <div className="flex-1">
              <img
                src="/mission1.png" // Replace with your actual image URL
                alt="Content 1"
                className="w-full max-w-md mx-auto border-2 border-gray-300 rounded-lg shadow-xl"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to provide a seamless experience for job seekers and employers alike. We strive to simplify the entire job search process, making it easier for individuals to find the best career opportunities that align with their skills and aspirations. At the same time, we help employers efficiently discover top talent, ensuring they can build strong, dynamic teams that drive success and growth within their organizations.
              </p>
            </div>
          </section>

          {/* Content Box 2 */}
          <section className="flex flex-col lg:flex-row items-center gap-8 mb-8">
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
              At JOBSPHERE, our vision is to be the most trusted and efficient platform for connecting job seekers and employers. We aim to create an environment where transparency, reliability, and user satisfaction are at the core of every interaction. Our goal is to simplify the hiring process, making it easy for candidates to find the best career opportunities and for employers to quickly discover top talent. We aspire to empower individuals and organizations by fostering a seamless, trustworthy, and efficient recruitment experience for all.              </p>
            </div>
            <div className="flex-1">
              <img
                src="/vision2.png" // Replace with your actual image URL
                alt="Content 2"
                className="w-full max-w-md mx-auto border-2 border-gray-300 rounded-lg shadow-xl"
              />
            </div>
          </section>

          {/* Button Section */}
          <section className="mb-12">
            {" "}
            {/* Added bottom margin for space between button and footer */}
            <button
              onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicked
              className="bg-green-800 hover:bg-green-900 focus:ring-2 focus:ring-green-800 active:bg-green-900 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
              Back to Top
            </button>
          </section>
        </div>
      </div>

      {/* Footer (Fixed at the bottom) */}
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
