import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [options, setOptions] = useState(false);
  const user = {
    name: "John",
  };
  const cart = {
    totalCount: 10,
  };
  const logout = () => {};
  return (
    <header>
      <div className="flex justify-between p-[15px] text-center text-white">
        <Link
          className="text-[40px] items-center flex font-extrabold hover:drop-shadow-2xl transition-all ease-out duration-1000 hover:bg-gradient-to-r from-blue-800 via-purple-500 to-red-800 z-10 bg-clip-text hover:text-transparent"
          to="/"
        >
          CRAVING'S
        </Link>
        <nav className="flex justify-center items-center px-[20px] font-bold uppercase">
          <ul className="flex gap-5 text-[20px] m-0 relative">
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
                  className={`absolute right-[55px] top-[35px] transition-all flex flex-col gap-4 backdrop-blur-[80px] drop-shadow-3xl p-[15px] z-100 ${
                    !options && "hidden"
                  } rounded-md`}
                >
                  <Link to="/profile">Profile</Link>
                  <Link to="/order">Orders</Link>
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
