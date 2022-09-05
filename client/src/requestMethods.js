import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

export const getToken = () => localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
  

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

console.log(currentUser)
console.log(TOKEN)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers:{token: getAuthorizationHeader()},
});


