import axios from "axios";
import BASE_URL from "../config/config";

export const rpDevis = async (data, credentials) => {
    const { resp } = await axios.post(`${BASE_URL}/artisan/respond_to_devis`, data, { headers: credentials });
    return resp;
  };
export const rqDevis = async (data, credentials) => {
    const { resp } = await axios.post(`${BASE_URL}/user/request_devis`, data, { headers: credentials });
    return resp;
  };