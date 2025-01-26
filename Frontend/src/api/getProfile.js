import axios from "axios";
import BASE_URL from "../config/config";

export const getTokenFromCookie = () => {
          const name = "token";  // The cookie name
          const cookies = document.cookie.split(';');  // Split all cookies into an array
          for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0) === ' ') {  // Trim leading spaces
              c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {  // Check if the cookie starts with 'token='
              return c.substring(name.length, c.length);  // Return the value of the token
            }
          }
          return "";  // Return empty string if no token is found
        };

export const getProfile = async (credentials) => {
  const { data } = await axios.get(`${BASE_URL}/user/profile`, credentials);
  return data;
};

export const getProfileArtisan = async (credentials) => {
  const { data } = await axios.get(`${BASE_URL}/artisan/profile`, credentials);
  return data;
};