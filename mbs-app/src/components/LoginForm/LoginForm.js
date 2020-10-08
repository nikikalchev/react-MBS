import React from 'react'
import './LoginForm.css';

function LoginForm(props) {
    
    function handleSubmit(event){
        event.preventDefault();
    }

    return (
        <div id="login-container">
            <form onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <img src="../../avatar.png" alt="Avatar" className="avatar"/>
                </div>

                <div className="container">
                    <div>
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required/>
                    </div>
                    <div>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

