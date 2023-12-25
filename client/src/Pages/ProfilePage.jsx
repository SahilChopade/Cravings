import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import ChangePassword from "../Components/ChangePassword";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  const handleSubmit = () => {
    console.log(data);
    updateProfile(data);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center gap-[5rem]">
      <div className="flex flex-col items-center">
        <div className="text-center text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
          UPDATE PROFILE
        </div>
        <div className="py-[20px] flex flex-col justify-center items-center gap-5 text-center backdrop-blur-[10px] border-[1px] border-black shadow-[10px_10px_8px_#000] rounded-[20px] min-w-[30rem] max-w-[50rem]">
          <input
            className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
            type="text"
            name="name"
            defaultValue={user.name}
            onChange={handleChange}
          />
          <input
            className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
            type="text"
            name="address"
            defaultValue={user.address}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="text-white shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black"
          >
            Update
          </button>
        </div>
      </div>
      <ChangePassword />
    </div>
  );
}
