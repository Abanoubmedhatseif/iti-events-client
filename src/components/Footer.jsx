import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css'; // Import the CSS file
import whiteLogo from '../assets/WhiteLogo.svg'; // Import the image

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#203947' }}>
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={whiteLogo} alt="ITI Logo" className="footer-logo" />
        </div>
        <div className="footer-section links">
          <h3>Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h3>Social Media Icons</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/ITIKnowledgeCityBranch/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/itians_newcapital/?hl=en" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/school/information-technology-institute-iti/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
