import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import authorizationApi from "../../service/authorization-api";
import "./RegistrationForm.css";
import {REGISTERED_USER} from '../../service/utills';

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function RegistrationForm({onUserRegistration}) {
  
  const initailUser = {
    name: null,
    email: null,
    password: null,
    role: REGISTERED_USER
  };

  const [user, setUser] = useState(initailUser);
  const [valid, setValid] = useState(true);
  const history = useHistory();

  const errorField = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = await authorizationApi.registerUser(user);
    //in case of error, show it on the screen   
    setValid(newUser.error ? false : true);
    errorField.current.value = newUser.error;
    errorField.current.focus();
    if(!newUser.error){
      //generate JSON webtoken and store it in the local storage
      //const token = jwt.sign({ _id: newUser._id }, 'jksf!dsf@35dsddg', { expiresIn: 3600}); 
      const token = jwt.sign({ user: newUser }, 'jksf!dsf@35dsddg', { expiresIn: 86400}); 
      localStorage.setItem('auth-token', token);
      history.push("/");
      onUserRegistration();
    }
  }

  function updateUser(event) {
    let value = "";
    if (event.target.name === "password") {
      value = bcrypt.hashSync(event.target.value, 8);
    } else {
      value = event.target.value;
    }
    setUser({
      ...user,
      [event.target.name]: value,
    });
  }

  const handleNameChanged = (event) => {
    updateUser(event);
  };

  const handleEmailChanged = (event) => {
    updateUser(event);
  };

  const handlePasswordChanged = (event) => {
    updateUser(event);
  };

  return (
    <div id="login-container">
      <form onSubmit={handleSubmit}>
        <div className="imgcontainer">
          <img src="../../avatar.png" alt="Avatar" className="avatar" />
        </div>
        <div className="container">
          <div>
            <input type="text" className={valid ? "valid" : "invalid"} ref={errorField} readOnly />
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="name"
              className="text-field"
              onChange={handleNameChanged}
              required
            />
          </div>
          <div>
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              className="text-field"
              placeholder="Enter email"
              name="email"
              onChange={handleEmailChanged}
              required
            />
          </div>
          <div>
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="new-password"
              className="text-field"
              onChange={handlePasswordChanged}
              required
            />
          </div>
          <button type="submit">Register</button>
          <Link to="/login" id="login-btn">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
