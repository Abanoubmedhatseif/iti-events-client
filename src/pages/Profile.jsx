import React, { useState } from "react";
import "../styles/Profile.css";

function App() {
  const [profile, setProfile] = useState({
    first_name: "Abanoub",
    last_name: "Medhat",
    email: "abanoub@example.com",
    password: "password123",
    profileImage: "profile-image.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    password: profile.password,
    profileImage: profile.profileImage,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="App">
      <main>
        <section className="profile">
          <div className="profile-box">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <div className="details">
              <h2>
                Name: {profile.first_name} {profile.last_name}
              </h2>
              <p>Email: {profile.email}</p>
              <p>Password: {profile.password}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
          </div>
        </section>
      </main>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditing(false)}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>
              <label htmlFor="name">First name:</label>
              <input
                type="text"
                id="firstname"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="name">Last name:</label>
              <input
                type="text"
                id="lastname"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                maxLength={20}
              />
              <label htmlFor="profileImage">Profile Image:</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
