import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
// import loginFormImage from "./images/loginformbackground.svg"
import "../../css/LoginForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  // const [emailErr, setEmailErr] = useState([]);
  // const [passErr, setPassErr] = useState([]);
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data)
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };



  const formErrors = (inputField) => {
    console.log(errors[0].split(' : ')[0])
    console.log("hittt")
    if(!errors.length) {
      return false
    }
    // let passwordErrors = []
    let errorObj = {}

    errors.forEach((err) => {
      if (err.split(' : ')[0] === "password"){
        errorObj['password'] = err.split(' : ')[1]
        console.log("INSIDE")
      }
      if (err.split(' : ')[0] === "email"){
        errorObj['email'] = err.split(' : ')[1]
      }
    })



    return errorObj

  }


  if (user) {
    return <Redirect to="/servers" />;
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
            <div className={errors.length && formErrors("email")['email'] ? "error-input-text": "input-text"}>EMAIL OR PHONE NUMBER{errors.length && formErrors("email")['email'] ?  (<span className="errors"> - {formErrors("email")['email']}</span>) : (<span className="asterik"> *</span>)}</div>
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
            <div className={errors.length && formErrors("password")['password'] ? "error-password-text": "input-text password-text"}>PASSWORD{errors.length && formErrors("password")['password'] ? (<span className="errors"> - {formErrors("password")['password']}</span>) :(<span className="asterik"> *</span>)}</div>
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
