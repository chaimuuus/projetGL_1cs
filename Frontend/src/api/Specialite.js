import axios from "axios";
import BASE_URL from "../config/config";

export const getArtisanSpecialites = async (credentials) => {
    const { data } = await axios.get(`${BASE_URL}/artisan/getSpecialites`, credentials);
    return data;
  };

export const addSpecialite = async(specialites, credentials) => {
    
    const  { data } = await axios.patch(`${BASE_URL}/artisan/addSpecialite`, specialites,{ headers: credentials });
    return data;
}