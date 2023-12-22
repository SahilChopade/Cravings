import { useState, createContext, useContext, Children } from "react";
import * as userService from "../routes/UserRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());
  const login = async (values) => {
    try {
      console.log("useot", values);
      const user = await userService.loginUser(values);
      console.log("userndetails", user);
      setUser(user);
      toast.success("Logged In Successfully!!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const register = async (data) => {
    try {
      const user = await userService.registerUser(data);
      setUser(user);
      toast.success("Registered Successfully!!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logged Out Successfully!!");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
