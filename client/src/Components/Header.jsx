import React, { useState } from "react";
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
  return (
    <header>
      <div className="flex justify-between p-[15px] text-center text-white">
        <Link to="/">
          <img className="w-[15rem]" src={Logo} alt="logo" />
        </Link>
        <nav className="flex justify-center items-center px-[20px] font-bold uppercase">
          <ul className="flex gap-5 text-[20px] m-0 relative">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <li>
                <Link
                  onClick={() => {
                    setOptions(!options);
                  }}
                >
                  {user.name}
                </Link>
                <div
                  className={`absolute z-[10000] right-[45px] top-[35px] transition-all flex flex-col gap-4 backdrop-blur-[80px] shadow-[10px_10px_5px_#000] border-[1px] border-black p-[15px] z-100 ${
                    !options && "hidden"
                  } rounded-md`}
                >
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a className="cursor-pointer" onClick={logout}>
                    LogOut
                  </a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
