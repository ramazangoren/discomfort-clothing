import "./Footer.css";
import { assets } from "../../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import americanExpress from '../../assets/cards/american-express.svg'
import visa from '../../assets/cards/visa.svg';
import maestro from '../../assets/cards/maestro.svg';
import applePay from '../../assets/wallets/apple-pay.svg'
import googlePay from '../../assets/wallets/google-pay.svg'

const Footer = () => {
  return (
    <div className="footer-main-container">
      <p className="join">Join DISCOMFORT CLOTHING</p>
      <div className="first-div">
        <div className="email">
          <input type="text" placeholder="Email" />
          <button>Join our newsletter</button>
        </div>
        <div className="social-links">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
        </div>
      </div>
      <div className="second-div">
        <div className="links-footer">
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/collections" activeclassname="active">
            Catalogue
          </NavLink>
          <NavLink to="/contact" activeclassname="active">
            Contact
          </NavLink>
          <NavLink> privacy policy</NavLink>
        </div>
        <div className="payment-methods">
          <img src={americanExpress} alt="Facebook" />
          <img src={visa} alt="LinkedIn" />
          <img src={maestro} alt="Twitter" />
          <img src={applePay} alt="Twitter" />
          <img src={googlePay} alt="Twitter" />
        </div>
      </div>
      <p className="rights">© 2024, DISCOMFORT CLOTHING. all rights reserved</p>
    </div>
  );
};

export default Footer;
