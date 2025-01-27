import axios from "axios";
import BASE_URL from "../config/config";



// Function to update user profile
export const artisanEditProfile = async (data, credentials) => {
    try {
          const response = await axios.patch(`${BASE_URL}/artisan/editprofile`, data, {
        headers: credentials,  // Send the credentials (headers) in the config
      });
  
      return response.data;  
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;  
    }
  };


export const updateProfilePic = async (data, credentials) => {
    try {
          const response = await axios.patch(`${BASE_URL}/artisan/updateProfilePic`, data, {
        headers: credentials,  // Send the credentials (headers) in the config
      });
  
      return response.data;  
    } catch (error) {
      console.error("Error updating profile pic:", error);
      throw error;  
    }
  };

  export const editPortfolio = async (data, credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/artisan/addProject`, data, {
    headers: credentials,  // Send the credentials (headers) in the config
  });
  
  return response.data;  
  } catch (error) {
  console.error("Error adding project :", error);
  throw error;  
  }
  };
  export const editCertificate = async (data, credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/artisan/addCertificat`, data, {
    headers: credentials,  // Send the credentials (headers) in the config
  });
  
  return response.data;  
  } catch (error) {
  console.error("Error adding project :", error);
  throw error;  
  }
  };
  