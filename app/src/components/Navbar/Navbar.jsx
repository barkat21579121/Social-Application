import React from "react";
import Lion from "../assests/lion.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JWT TOKEN");
    localStorage.removeItem("username");

    console.log("navigate", navigate);
    navigate("/");
  };
  const UserName = localStorage.getItem("username");

  return (
    <div className="mainNav">
      <div className="leftNav">
        <img src={Lion} alt="pngs" />
      </div>
      <div className="navCenter">
        <p> ❤Welcome Mr.{UserName}❤</p>
      </div>
      <div className="rightNav">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
