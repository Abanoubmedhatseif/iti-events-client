import React from 'react';
import '../styles/HowItWorks.css'; // Import the CSS file

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2 className="how-it-works-title">How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-description">
            <h3>Browse Events</h3>
            <p>Explore and discover upcoming events on our website.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-description">
            <h3>Register for an Event</h3>
            <p>Sign up and register for your preferred event.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-description">
            <h3>Book Your Bus Ride</h3>
            <p>Reserve your seat from the mobile app for convenient transportation to the event.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
