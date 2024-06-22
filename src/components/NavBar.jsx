import "../styles/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="https://iti.gov.eg/assets/images/ColoredLogo.svg"
              alt="ITI Logo"
            />
          </div>
          <nav className="navbar-links">
            <Link to="/">HOME</Link>

            <Link to="/events">EVENTS</Link>
            <Link to="/categories">CATEGORIES</Link>
            <Link to="/about">ABOUT ITI</Link>
          </nav>
          <div className="navbar-auth">
            <button className="login-button">
              <Link to="/login">Login</Link>
            </button>
            <button className="register-button">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;