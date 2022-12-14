import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
// import loginFormImage from "./images/loginformbackground.svg"
import "../../css/LoginForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const formErrors = () => {
    const errorsList = errors.map((error, ind) => (
      <div key={ind}>{error}</div>
    ))

  }
  return (
    <div className="login-form-page">
      {/* <img src={loginFormImage} alt="loginForm" /> */}
      <div className="login-form-page-container">
        <div className="login-form">
          <div className="left-form">
          <div className="title-container">
            <div className="top-header">Welcome back!</div>
            <div className="bottom-header-text">
              We're so excited to see you again!
            </div>
          </div>
          <div className="form-box">

          <form autocomplete="off" onSubmit={onLogin}>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            <div className={errors.length >= 1 ? "error-input-text": "input-text"}>EMAIL OR PHONE NUMBER{!errors.length ? (<span className="asterik"> *</span>) : (<span className="errors"> - {errors[0]}</span>)}</div>
            <div>
              <label htmlFor="email"></label>
              <input
                name="email"
                type="email"
                // placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className={errors.length > 1 ? "error-password-text": "input-text password-text"}>PASSWORD{!errors.length > 1 ?  (<span className="errors"> - {errors[1]}</span>) :(<span className="asterik"> *</span>)}</div>
            <div>
              <label htmlFor="password"></label>
              <input
                name="password"
                type="password"
                // placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <div className="forgot-password">Forgot your password</div>
              <button type="submit" className="submit-button">Login</button>
              <div className="register"><span id="need-account">Need an account?</span> <span id="register-link">Register</span></div>
            </div>
          </form>
          </div>

          </div>
          <div className="right-form">
            Log in with QR Code
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
