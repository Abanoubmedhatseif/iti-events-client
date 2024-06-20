import React, { useState } from "react";
import "../styles/Profile.css";

function App() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    profileImage: "profile-image.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name,
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
              <h2>Name: {profile.name}</h2>
              <p>Email: {profile.email}</p>
              <p>Password: ••••••••</p>
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="profileImage">Profile Image:</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
