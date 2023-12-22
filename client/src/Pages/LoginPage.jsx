import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../routes/UserRoutes";
import { useAuth } from "../Hooks/useAuth";
export default function LoginPage() {
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialData);
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(userData);
    await login(userData);
  };
  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);
  return (
    <div className="flex justify-center text-white">
      <div className="pb-[20px] flex flex-col justify-center items-center gap-5 text-center backdrop-blur-[10px] border-[1px] border-black shadow-[10px_10px_8px_#000] rounded-[20px] min-w-[30rem] max-w-[50rem]">
        <div className="uppercase text-[30px] font-extrabold text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mt-[2rem]">
          Login
        </div>
        <input
          className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black"
        >
          Login User
        </button>
        <hr className="min-w-[20rem] max-w-[30rem] flex justify-center" />
        <div className="text-[20px] flex items-center gap-3">
          New to Us?
          <Link
            className="border-[1px] border-black p-[2px] px-[5px] rounded-[10px]"
            to={`/register?${returnUrl ? "returnUrl=" + returnUrl : ""}`}
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
