import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
// import loginFormImage from "./images/loginformbackground.svg"
import "../../css/LoginForm.css";
import qrImage from "../../css/images/thiscordQrCode.png";
import { fetchOneServer, fetchServers } from "../../store/server";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [firstChannel, setFirstChannel] = useState("");
  const [serverId, setServerId] = useState("");
  // const channels = useSelector(state => state.server.servers[0].channels)
  // const servers = useSelector((state) => state.server.servers);
  // const server = useSelector((state) => state.server.server);
  // const [emailErr, setEmailErr] = useState([]);
  // const [passErr, setPassErr] = useState([]);
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
      .then((data) => {
        if (data) {
          setErrors(data);

        } else (async () => {
          const response = await fetch(`/api/servers/`);
          const data = await response.json();
          const firstChannelResponse = await data?.servers[0]?.channels[0]?.id;
          console.log(firstChannelResponse, "WORKKKKKKKK");
          setFirstChannel(firstChannelResponse);
          setServerId(data?.servers[0]?.id);
          history.push(`/channels/${firstChannelResponse}`);
          return firstChannelResponse
        })().then((firstChannelResponse) => {
          dispatch(fetchOneServer(firstChannelResponse));
        })
      })
    // if (data) {
    //   setErrors(data);
    // }
  };



  const demoOneLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password")).then(() => {
      (async () => {
        const response = await fetch(`/api/servers/`);
        const data = await response.json();
        const firstChannelResponse = await data?.servers[0]?.channels[0]?.id;
        setFirstChannel(firstChannelResponse);
        setServerId(data?.servers[0]?.id);
        history.push(`/channels/${firstChannelResponse}`);
        return firstChannelResponse
      })().then((firstChannelResponse) => {
        dispatch(fetchOneServer(firstChannelResponse));

      })
    })
  };

  const demoTwoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo2@aa.io", "password")).then(() => {
      (async () => {
        const response = await fetch(`/api/servers/`);
        const data = await response.json();
        const firstChannelResponse = await data?.servers[0]?.channels[0]?.id;

        setFirstChannel(firstChannelResponse);
        setServerId(data?.servers[0]?.id);
        history.push(`/channels/${firstChannelResponse}`);
        return firstChannelResponse
      })().then((firstChannelResponse) => {
        dispatch(fetchOneServer(firstChannelResponse));
      })
    })
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const formErrors = (inputField) => {
    if (!errors.length) {
      return false;
    }
    let errorObj = {};

    errors.forEach((err) => {
      if (err.split(" : ")[0] === "password") {
        errorObj["password"] = err.split(" : ")[1];
      }
      if (err.split(" : ")[0] === "email") {
        errorObj["email"] = err.split(" : ")[1];
      }
    });

    return errorObj;
  };

  if (user) {

    dispatch(fetchServers(user.id))
      .then((servers) => {
        console.log(servers.servers[0].id, "LOGINFORMMMMMM SERVERIDDDDD")
        dispatch(fetchOneServer(servers.servers[0].id));
        history.push(`/channels/${servers.servers[0].id}`);
      })

  }
  return (
    <div className="login-form-page">
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

                <div
                  className={
                    errors.length && formErrors("email")["email"]
                      ? "error-input-text"
                      : "input-text"
                  }
                >
                  EMAIL
                  {errors.length && formErrors("email")["email"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("email")["email"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    name="email"
                    type="email"
                    // placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                    required
                  />
                </div>
                <div
                  className={
                    errors.length && formErrors("password")["password"]
                      ? "error-password-text"
                      : "input-text password-text"
                  }
                >
                  PASSWORD
                  {errors.length && formErrors("password")["password"] ? (
                    <span className="errors">
                      {" "}
                      - {formErrors("password")["password"]}
                    </span>
                  ) : (
                    <span className="asterik"> *</span>
                  )}
                </div>
                <div>
                  <label htmlFor="password"></label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={updatePassword}
                  />
                  <NavLink to='/coming-soon'>
                    <div className="forgot-password">Forgot your password</div>
                  </NavLink>
                  <button type="submit" className="submit-button">
                    Log in
                  </button>
                  <button onClick={demoOneLogin} className="submit-button demo">
                    Demo user 1
                  </button>
                  <button onClick={demoTwoLogin} className="submit-button">
                    Demo user 2
                  </button>
                  <div className="register">
                    <span id="need-account">Need an account?</span>{" "}
                    <NavLink to='/sign-up'> <span id="register-link">Register</span></NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="right-form">
            <div className="qr-code-box">
              <img id="qr-image" src={qrImage} alt="qrlogin" />
            </div>
            <div className="qr-header-text">Log in with QR Code</div>
            <div className="qr-sub-header">
              Scan this with the <span>This.cord mobile app</span> to log in
              instantly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
