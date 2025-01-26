import axios from "axios";
import BASE_URL from "../config/config";


export const getMetiers = async (credentials) => {
    const { data } = await axios.get(`${BASE_URL}/artisan/getMetiers`, credentials);
    return data;
  };
  export const getMetierSpecialites = async (id, credentials) => {
    const { data } = await axios.get(`${BASE_URL}/artisan/getMetierSpecialites`, {
      headers: credentials.headers,
      params: { metier: id }, // Include metier as a query parameter
    });
    return data;
  };