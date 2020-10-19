import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import authorizationApi from "../../service/authorization-api";
import './LoginForm.css';

const jwt = require("jsonwebtoken");

function LoginForm({onUserLoggedIn}) {

    const initialUser = {
        email: null,
        password: null,
    };
    
    const [user, setUser] = useState(initialUser);
    const [valid, setValid] = useState(true);
    const history = useHistory();

    const errorField = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const loginUser = await authorizationApi.login(user);
        //in case of error, show it on the screen   

        setValid(loginUser.error ? false : true);
        errorField.current.value = loginUser.error;
        errorField.current.focus();
        if(!loginUser.error){
            //generate JSON webtoken and store it in the local storage
            //const token = jwt.sign({ _id: loginUser._id }, 'jksf!dsf@35dsddg', { expiresIn: 3600});
            const token = jwt.sign({ user: loginUser }, 'jksf!dsf@35dsddg', { expiresIn: 86400});  
            localStorage.setItem('auth-token', token);
            history.push("/");
            onUserLoggedIn();
        }
    }

    function updateUser(event) {
        const value = event.target.value;
        setUser({
          ...user,
          [event.target.name]: value,
        });
      }
    
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
                        <label htmlFor="email"><b>Username</b></label>
                        <input type="text" 
                               placeholder="Enter Email" 
                               className="text-field" 
                               onChange={handleEmailChanged}
                               name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" 
                               placeholder="Enter Password" 
                               className="text-field"
                               autoComplete="new-password"
                               onChange={handlePasswordChanged} 
                               name="password" required />
                    </div>
                    <button type="submit">Login</button>
                    <Link to="/register" id="register-btn">
                        <button type="button">Register</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

