import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Redirect, NavLink} from "react-router-dom";
import { signUp } from "../../store/session";
import "../../css/LoginForm.css";
import "../../css/SignUpForm.css";
import { createServer } from "../../store/server";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password))

        if (data){
          setErrors(data);
        }
  }else (setErrors(["password : paswords do not match"]))
};

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setErrors([])
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    setErrors([])
  };

  const formErrors = (inputField) => {

    if (!errors.length) {
      return false;
    }

    // let passwordErrors = []
    let errorObj = {};

    errors.forEach((err) => {
      if (err.split(" : ")[0] === "password") {
        errorObj["password"] = err.split(" : ")[1];
      }
      if (err.split(" : ")[0] === "email") {
        errorObj["email"] = err.split(" : ")[1];
      }
      if (err.split(" : ")[0] === "username") {
        errorObj["username"] = err.split(" : ")[1];
      }
    });

    return errorObj;
  };

  if (user) {

    return <Redirect to="/login" />;
  }

  return (
    <div className="login-form-page">
      <div className="signup-form-page-container">
        <div className="signup-form">
          <div className="form-container">
            <div className="form-title">Create an account</div>
            <form onSubmit={onSignUp}>
              <div>
              </div>
              <div className="inputs-container">
                <div className={
                    errors.length && formErrors("email")["email"]
                      ? "error-input-text"
                      : "form-input-text email-text" }>EMAIL
                      {errors.length && formErrors("email")["email"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("email")["email"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}</div>
                <label></label>
                <input
                  type="email"
                  name="email"
                  onChange={updateEmail}
                  value={email}

                  required
                ></input>
              </div>
              <div className="inputs-container">
              <div className={
                    errors.length && formErrors("username")["username"]
                      ? "error-input-text"
                      : "form-input-text" }>USERNAME
                      {errors.length && formErrors("username")["username"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("username")["username"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}</div>
                <label></label>

                <input
                  type="text"
                  name="username"
                  minLength="4"
                  maxLength="20"
                  onChange={updateUsername}
                  value={username}
                  required
                ></input>
              </div>
              <div className="inputs-container">
              <div className={
                    errors.length && formErrors("password")["password"]
                      ? "error-input-text"
                      : "form-input-text" }>PASSWORD
                      {errors.length && formErrors("password")["password"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("password")["password"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}</div>
                <label></label>
                <input
                  type="password"
                  name="password"
                  minLength="5"
                  maxLength="16"
                  onChange={updatePassword}
                  value={password}
                  required
                ></input>
              </div>
              <div className="inputs-container">
              <div className={
                    errors.length && formErrors("password")["password"]
                      ? "error-input-text"
                      : "form-input-text" }>CONFIRM PASSWORD
                      {errors.length && formErrors("password")["password"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("password")["password"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}</div>
                <input
                  type="password"
                  name="repeat_password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <div className="login-link"><NavLink to='/login' style={{ textDecoration: 'none' }}>Already have an account?</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
