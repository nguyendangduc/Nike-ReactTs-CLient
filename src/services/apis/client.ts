import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3005/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default client;
