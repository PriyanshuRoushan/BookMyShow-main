import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export const getShows = async (cityId, movieId, date) => {
  const res = await API.get("/shows", {
    params: { cityId, movieId, date }
  });
  return res.data;
};
