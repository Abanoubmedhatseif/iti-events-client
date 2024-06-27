import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import contactImage from '../assets/contactImage.jpg';
import Button from '../components/Button';

function ContactUs() {
  const [alert, setAlert] = useState(null);
  const form = useRef();

  useEffect(() => {
    emailjs.init(process.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.VITE_EMAILJS_SERVICE_ID, process.env.VITE_EMAILJS_TEMPLATE_ID, form.current)
      .then(
        () => {
          setAlert('Message sent successfully!');
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          setAlert('Failed to send message. Please try again.');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <MDBContainer className="py-5 contact-form-container">
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4 contact-form-card">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-xl-block">
                <MDBCardImage src={contactImage} alt="Sample photo" fluid />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="text-black contact-form-body">
                  {alert && (
                    <div className="alert alert-success" role="alert">
                      {alert}
                    </div>
                  )}
                  <form ref={form} onSubmit={sendEmail}>
                    <MDBTypography tag="h3" className="mb-4 contact-form-title">Contact Us</MDBTypography>

                    <div className="contact-form-input">
                      <label htmlFor="name" className="form-label">Name</label>
                      <MDBInput name="name" type="text" className="form-control" size="lg" />
                    </div>

                    <div className="contact-form-input">
                      <label htmlFor="email" className="form-label">Email</label>
                      <MDBInput id="email" type="text" className="form-control" size="lg" name="email" />
                    </div>

                    <div className="contact-form-textarea">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea rows="6" id="message" className="form-control" name="message"></textarea>
                    </div>

                    <div className="contact-form-button">
                      <Button
                        type="submit"
                        text="Send"
                        width={100}
                        height={40}
                        backgroundColor="#000000"
                        color="#ffffff"
                      />
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ContactUs;
