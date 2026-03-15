import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const getTheatresByCity = async (cityId) => {
    const res = await API.get(`/theatres/city/${cityId}`);
    return res.data;
};