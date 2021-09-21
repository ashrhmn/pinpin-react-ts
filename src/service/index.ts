import axios from "axios";

const token = localStorage.getItem("authToken");

export default axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    authToken: token,
    "Content-type": "Application/json",
  },
});
