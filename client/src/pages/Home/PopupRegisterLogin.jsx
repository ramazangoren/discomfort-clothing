import { Link } from "react-router-dom";
import "./PopupRegisterLogin.css";
import { RiCloseLargeFill } from "react-icons/ri";

const PopupRegisterLogin = ({ onClose }) => {
  return (
    <div className="PopupRegisterLogin-overlay">
      <div className="PopupRegisterLogin-popup-container">
        <h2>Welcome to Discomfort Clothing!</h2>
        <p>
          Explore our unique collection of T-shirts and more. We're excited to
          have you here!
        </p>
        <div className="PopupRegisterLogin-links-container">
          <p>
            Already have an account? <Link to="/login" className="PopupRegisterLogin-link">Login</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register" className="PopupRegisterLogin-link">Register</Link>
          </p>
        </div>
        <button className="PopupRegisterLogin-close-button" onClick={onClose}>
         <RiCloseLargeFill/>
        </button>
      </div>
    </div>
  );
};

export default PopupRegisterLogin;
