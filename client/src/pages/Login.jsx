import React from "react";
import "./Register.css";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const values = {
      email: email.value,
      password: password.value,
    };

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful");
        navigate("/");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="wrapper">
          <div className="logotext">
            <h1>DOC-APP</h1>
          </div>
          <div className="welcometext">Welcome back to DOC-APP!</div>
          <div className="form-box">
            <form onSubmit={onSubmitHandler}>
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="outlineinput">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className="outlineinput">
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit">Login</button>
              <p>
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="right">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/welcome-bg1.png"
                  className="d-block w-100"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/welcome-bg2.webp"
                  className="d-block w-100"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/welcome-bg3.webp"
                  className="d-block w-100"
                  alt="Third slide"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
