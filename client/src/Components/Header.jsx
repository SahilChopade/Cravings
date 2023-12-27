import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoText from "./LogoText";
import Logo from "../Assets/Logo.gif";
import { useCart } from "../Hooks/useCart";
import { useAuth } from "../Hooks/useAuth";
export default function Header() {
  const [options, setOptions] = useState(false);
  const { user, logout } = useAuth();
  // console.log("This is my user",user);
  const { cart } = useCart();
  useEffect(() => {
    if (options) {
      setTimeout(() => {
        setOptions(!options);
      }, 5000);
    }
  }, [options]);
  return (
    <header>
      <div className="flex justify-between p-[15px] text-center text-white">
        <Link to="/">
          <img className="w-[15rem]" src={Logo} alt="logo" />
        </Link>
        <nav className="flex justify-center items-center font-bold uppercase">
          <ul className="flex gap-2 text-[20px] relative border-[1px] border-black p-[5px] rounded-[10px] shadow-[inset_2px_2px_10px_#092b2d]">
            {user ? (
              <li className="hover:bg-[#1d425e] transition-all duration-75 p-[5px] rounded-[10px]">
                <Link
                  onClick={() => {
                    setOptions(!options);
                  }}
                >
                  {user.name}
                </Link>
                <motion.div
                  className={`z-[10000] absolute top-[55px] right-[50px] transition-all flex flex-col gap-4 backdrop-blur-[80px] shadow-[10px_10px_5px_#000] border-[1px] border-black p-[15px] z-100 ${
                    !options && "hidden"
                  } rounded-md`}
                >
                  <Link className="hover:bg-[#1d425e] transition-all duration-75 p-[5px] rounded-[10px]" to="/profile">Profile</Link>
                  <Link className="hover:bg-[#1d425e] transition-all duration-75 p-[5px] rounded-[10px]" to="/orders">Orders</Link>
                  <a className="hover:bg-[#1d425e] transition-all duration-75 p-[5px] rounded-[10px] cursor-pointer" onClick={logout}>
                    LogOut
                  </a>
                </motion.div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <li className="hover:bg-[#1d425e] transition-all duration-75 p-[5px] rounded-[10px]">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
