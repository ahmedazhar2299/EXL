import axios from "axios";
const serverPort = process.env.REACT_APP_SERVER_PORT;
const API = axios.create({
  baseURL: `http://localhost:${serverPort}`,
});

export default API;
