import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  // Fetch user profile
  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:4000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data); // Store profile data including imageUrl
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []); // Fetch profile once on mount

  // Function to update profile
  const updateProfile = async (updatedProfile) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await axios.put(
        "http://localhost:4000/api/user/profile",
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile({
        ...response.data,
        imageUrl: response.data.imageUrl || updatedProfile.imageUrl, // Ensure imageUrl is retained
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
