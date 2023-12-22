import axios from "axios";

export const registerUser = async (values) => {
  const { data } = await axios.post("/api/user/register", values);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const loginUser = async (values) => {
  const { data } = await axios.post("api/user/login", values);
  console.log("This is my data", data);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
