import axios from "axios";
import BASE_URL from "../config/config";

export const login = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}/user/login`, credentials);
  return data;
};

export const signup = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}/user/signup`, credentials);
  return data;
};
export const loginArtisan = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}/artisan/login`, credentials);
  return data;
};

export const signupArtisan = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}/artisan/signup`, credentials);
  return data;
};