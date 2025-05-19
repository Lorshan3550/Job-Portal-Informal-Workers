import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <>
      <section className="homePage page pt-0">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;