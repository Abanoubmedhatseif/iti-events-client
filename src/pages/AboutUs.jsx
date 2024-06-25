import React from 'react';
import itinewCapital from '../assets/itinewCapital.png';
import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="section" style={{ backgroundImage: `url(${itinewCapital})` }}>
      <div className="section-container">
        <h1 className="heading">Welcome To ITI Events Website</h1>
        <p className="paragraph">Discover and book exciting events and educational opportunities happening at ITI Egypt.</p>
        <a href="#our-story" className="call-to-action">Discover Our Story</a>
      </div>

      <div id="our-story" className="section-container">
        <h2 className="heading">Our Story</h2>
        <p className="paragraph">ITI Egypt has a rich history of providing top-notch training and events. We are committed to fostering innovation and learning.</p>
        <p className="paragraph">Join us on a journey to explore our milestones and achievements.</p>
        <a href="#our-mission" className="call-to-action">Explore Our Mission</a>
      </div>

      <div id="our-mission" className="section-container">
        <h2 className="heading">Our Mission</h2>
        <p className="paragraph">Our mission is to empower individuals through education and technology. We aim to create a community of skilled professionals.</p>
        <p className="paragraph">Learn more about our goals and how we plan to achieve them.</p>
        <a href="#contact-us" className="call-to-action">Get In Touch</a>
      </div>

      <div id="contact-us" className="section-container">
        <h2 className="heading">Let's Connect</h2>
        <p className="paragraph">Have questions or need more information? Reach out to us and we'll be happy to assist you.</p>
        <p className="paragraph">We look forward to connecting with you and welcoming you to our events.</p>
        <a href="#our-story" className="call-to-action">Back to Top</a>
      </div>
    </div>
  );
};

export default AboutUsPage;
