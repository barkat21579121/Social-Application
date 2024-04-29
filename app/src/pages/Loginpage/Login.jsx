import React, { useState } from "react";
import login from "../../components/assests/lion.png";
import loginlogo from "../../components/assests/loginlogo.avif";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const ApiUrl = "http://localhost:4000/users/api/Signin";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(ApiUrl, formData);
      alert(res.data.message);
      if (res.status === 200) {
        Navigate("/home");
      }
      localStorage.setItem("username", res.data.name);

      console.log(">>>>>", res.data);
      localStorage.setItem("JWT TOKEN", res.data.token);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="loginDiv">
      <div className="loginleftDiv">
        <div className="LoginLeftChild">
          <img src={login} alt="" />
        </div>
      </div>
      <div className="loginRightDiv">
        <form
          className="loginRightChild"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <img src={loginlogo} alt="" />
          <input
            type="email"
            placeholder="type Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="Login_btn" type="submit">
            Login
          </button>
          <p>
            Don't have an account - <NavLink to="/signUp">SignUp</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
