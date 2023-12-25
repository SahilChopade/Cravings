import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV !== "https://cravingsbackend.onrender.com" ? "http://localhost:4000" : "/";
