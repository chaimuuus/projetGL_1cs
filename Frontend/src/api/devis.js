import axios from "axios";
import BASE_URL from "../config/config";


export const rqDevis = async (data, credentials) => {
    const { resp } = await axios.post(`${BASE_URL}/user/request_devis`, data, { headers: credentials });
    return resp;
};

export const UserrqDevisList = async(credentials) =>{
    const {data} = await axios.get(`${BASE_URL}/user/requested_devis`, credentials);
    return data;
};

export const UserrpDevisList = async(credentials) =>{
    const {data} = await axios.get(`${BASE_URL}/user/responded_devis`, credentials);
    return data;
};


//artisan deivs
export const rpDevis = async (data, credentials) => {
  const { resp } = await axios.post(`${BASE_URL}/artisan/respond_to_devis`, data, { headers: credentials });
  return resp;
};

export const ArtisanrqDevisList = async(credentials) =>{
    const {data} = await axios.get(`${BASE_URL}/artisan/requested_devis`, credentials);
    return data;
};

export const ArtisanrpDevisList = async(credentials) =>{
    const {data} = await axios.get(`${BASE_URL}/artisan/responded_devis`, credentials);
    return data;
};