import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export const getScreensByTheatre = (theatreId) =>
  API.get(`/screens/theatre/${theatreId}`);

export const getScreenById = (screenId) =>
  API.get(`/screens/${screenId}`);
