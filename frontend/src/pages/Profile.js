import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import Navigation from "../components/Navigation";
import UpImage from "../components/UpImage";
import "../styles/profile.css";

const Profile = () => {
  const { profile, updateProfile, fetchProfile } = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [imageURL, setImageURL] = useState(profile?.imageUrl || ""); // Use imageUrl from profile

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    age: profile?.age || "",
    address: profile?.address || "",
  });

  useEffect(() => {
    fetchProfile(); // Ensure profile data is fetched on mount
  }, []);

  useEffect(() => {
    if (profile) {
      setImageURL(profile.imageUrl || ""); // Update imageURL when profile changes
      setFormData({
        name: profile.name || "",
        age: profile.age || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  if (!profile) {
    return <div className="loading">Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ ...formData, imageUrl: imageURL }); // Use imageURL from state
    setIsEditing(false);
  };

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  return (
    <div>
      <Navigation />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">User Profile</h2>
          <div className="profile-image-container">
            {imageURL ? (
              <img src={imageURL} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">No Image</div>
            )}
          </div>
          {isEditing && <UpImage onUpload={handleImageUpload} />}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="profile-details">
              <p>
                <span className="detail-label">Name:</span> {profile.name}
              </p>
              <p>
                <span className="detail-label">Email:</span> {profile.email}
              </p>
              <p>
                <span className="detail-label">Age:</span> {profile.age}
              </p>
              <p>
                <span className="detail-label">Address:</span> {profile.address}
              </p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
