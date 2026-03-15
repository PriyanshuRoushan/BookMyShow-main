// import axios from "axios";

// const API = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {"Content-Type": "application/json"}
// });

// // Register User
// export const registerUser = async (data) => {
//     return await API.post('/auth/register', data);
// };

// //Login User
// export const loginUser = async (data) => {
//     return await API.post('/auth/login', data);
// };

import axios from "axios";

console.log("BASE URL FROM ENV 👉", process.env.REACT_APP_BASE_URL);

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => {
  console.log("LOGIN PAYLOAD 👉", data);
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};
