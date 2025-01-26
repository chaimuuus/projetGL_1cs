import axios from "axios";
import BASE_URL from "../config/config";


export const getMetiers = async (credentials) => {
    const { data } = await axios.get(`${BASE_URL}/artisan/getMetiers`, credentials);
    return data;
  };