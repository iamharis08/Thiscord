import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Redirect, NavLink} from "react-router-dom";
import { signUp } from "../../store/session";
import "../../css/LoginForm.css";
import "../../css/SignUpForm.css";

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
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-page">
      <div className="signup-form-page-container">
        <div className="signup-form">
          <div className="form-container">
            <div className="form-title">Create an account</div>
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className="inputs-container">
                <div className="form-input-text email-text">EMAIL</div>
                <label></label>
                <input
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div className="inputs-container">
                <label></label>
                <div className="form-input-text">USERNAME</div>
                <input
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className="inputs-container">
                <label></label>
                <div className="form-input-text">PASSWORD</div>
                <input
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className="inputs-container">
                <label></label>
                {/* <div className="form-input-text">DATE OF BIRTH</div>
                <input
                  type="password"
                  name="repeat_password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input> */}
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
