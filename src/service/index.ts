import axios from "axios";

// const token = localStorage.getItem("authToken");

export default axios.create({
  baseURL: "https://pinash.herokuapp.com/api/",
  // baseURL: "http://localhost:5000/api/",
  headers: {
    authToken: localStorage.getItem("authToken"),
    "Content-type": "Application/json",
  },
});
