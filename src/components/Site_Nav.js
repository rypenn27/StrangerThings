import React, { useState } from "react";
import "./Site_Nav.css";
import { Button, Modal } from "react-bootstrap";
import { render } from "react-dom";
import {
  registerUser,
  loginUser,
  logOut,
  isUserLoggedIn,
  userData,
} from "../api";

const Site_Nav = (props) => {
  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = async () => {
    const result = await loginUser(username, password);
    if (result) {
      setCurrentUser(await userData());
    }
    setIsLoggedIn(isUserLoggedIn());
  };

  const onRegister = async () => {
    const result = await registerUser(username, password);
    if (result) {
      setCurrentUser(await userData());
    }
    setIsLoggedIn(isUserLoggedIn());
  };

  const onLogout = () => {
    logOut();
    setIsLoggedIn(isUserLoggedIn());
    setCurrentUser(null);
  };

  const loginForm = (
    <>
      <h5>Username</h5>
      <input value={username} onChange={onUsernameChange} type="text"></input>
      <h5>Password</h5>
      <input
        value={password}
        onChange={onPasswordChange}
        type="password"
      ></input>
      <Button className="Register" onClick={onRegister}>
        Register
      </Button>
      <Button className="Login" onClick={onLogin}>
        Login
      </Button>
    </>
  );

  const logoutForm = (
    <Button className="Logout" onClick={onLogout}>
      Logout
    </Button>
  );

  const displayForm = isLoggedIn ? logoutForm : loginForm;

  return <div className="site_nav">{displayForm}</div>;
};

export default Site_Nav;
