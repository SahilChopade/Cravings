import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const search = async () => {
    term ? navigate("/search/" + term) : navigate("/");
  };
  return (
    <div className="relative flex items-center justify-center p-[10px]">
      <input
        className="placeholder-white flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
        type="text"
        placeholder="Search Food"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        defaultValue={searchTerm}
      />
      <span className="cursor-pointer relative right-[25px]" onClick={search}>🔍</span>
    </div>
  );
}
