import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfileArtisan } from "./api/getProfile"; // API to fetch user profile
import { getTokenFromCookie } from "./api/getProfile"; // Function to get token

const PrivateRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile
  const getUserProfile = async () => {
    try {
      const token = getTokenFromCookie(); // Get token from cookies
      if (token) {
        try {
          const response = await getProfileArtisan({
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setUser(response.user); // Set user data
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false); // Stop loading once profile fetch is complete
    }
  };

  // Fetch profile on component mount
  useEffect(() => {
    getUserProfile();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  const userRole = user.role || "user"; 
  // Check if user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
  }

  // Render children if authenticated and role is allowed
  return children;
};

export default PrivateRoute;
