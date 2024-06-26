import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css"; // Import the CSS file
import whiteLogo from "../assets/WhiteLogo.svg"; // Import the image
import { Box } from "@mui/material";
import { Link as LinkR } from "react-router-dom";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      className="footer"
      height="fit-content"
      py={2}
      sx={{ bgColor: "#203947", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box m="auto">
          <img src={whiteLogo} alt="ITI Logo" className="footer-logo" />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            m: "auto",
            px: 10,
          }}
        >
          <Link
            component={LinkR}
            sx={{
              textDecoration: "none",
              color: "white",
              ":hover": { color: "red" },
            }}
            to="/about"
          >
            About Us
          </Link>

          <Link
            component={LinkR}
            sx={{
              textDecoration: "none",
              color: "white",
              ":hover": { color: "red" },
            }}
            color="primary"
            to="/about#our-story"
          >
            Our Story
          </Link>

          <Link
            component={LinkR}
            sx={{
              textDecoration: "none",
              color: "white",
              ":hover": { color: "red" },
            }}
            color="primary"
            to="/about#our-mission"
          >
            Our Mission
          </Link>

          <Link
            component={LinkR}
            sx={{
              textDecoration: "none",
              color: "white",
              ":hover": { color: "red" },
            }}
            color="primary"
            to="/about#contact-us"
          >
            Contact Us
          </Link>
        </Box>

        <Box justifyContent="end" m="auto">
          <h3>Social Media Icons</h3>
          <div className="social-icons">
            <Link
              component={LinkR}
              to="https://www.facebook.com/ITIKnowledgeCityBranch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              component={LinkR}
              to="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              component={LinkR}
              to="https://www.instagram.com/itians_newcapital/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              component={LinkR}
              to="https://www.linkedin.com/school/information-technology-institute-iti/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
