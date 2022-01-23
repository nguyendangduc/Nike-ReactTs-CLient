import axios from "axios";
import {
  logoutSuccess,
  useAppDispatch
} from "../../services/store";
const client = axios.create({
  baseURL: "http://localhost:3005/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default client;
