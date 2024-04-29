import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import login from "../../components/assests/lion.png";
import loginlogo from "../../components/assests/loginlogo.avif";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const Navigate = useNavigate();
  const apiUrl = "http://localhost:4000/users/api/signup";

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(apiUrl, values);
      console.log(response);
      if (response.status === 201) {
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <div className="loginDiv">
      <div className="loginleftDiv">
        <div className="LoginLeftChild">
          <img src={login} alt="" />
        </div>
      </div>
      <div className="loginRightDiv">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              className="loginRightChild"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img src={loginlogo} alt="" />
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
              <button
                className="Login_btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>
              <p>
                AlreadyUser -<NavLink to="/"> Login </NavLink>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
