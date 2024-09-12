import "./Home.css";
import Hero from "./Hero.jsx";
import FeaturedProducts from "./FeaturedProducts";
import { assets } from "../../assets/assets.js";
import PopupRegisterLogin from "./PopupRegisterLogin.jsx";
import { useState, useEffect } from 'react';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
  //   setTimeout(() => {
  //     setShowPopup(true);
  // }, 1000);
  }, []);

  useEffect(() => {
    // Check if the popup has been shown before
    const hasShownPopup = localStorage.getItem("hasShownPopup");
    if (!hasShownPopup) {
      // Show popup after 1 second delay on first visit
      setTimeout(() => {
        setShowPopup(true);
        // Set a flag in localStorage to indicate the popup has been shown
        localStorage.setItem("hasShownPopup", "true");
      }, 1000);
    }
  }, []);


  const closePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    const baseTitle = "DISCOMFORT CLOTHING";
    document.title = `${baseTitle}`;
  }, []);
  return (
    <div>
      <Hero/>
      <FeaturedProducts assets={assets} />
      {showPopup && <PopupRegisterLogin onClose={closePopup} />}
    </div>
  );
};

export default Home;
