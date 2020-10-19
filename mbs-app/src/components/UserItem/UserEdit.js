import React, { useState, useRef } from "react";
import { UserType } from "../../model/user.model";
import "./UserEdit.css";
import usersApi from "../../service/users-api";
import { isAdmin } from "../../service/utills";
import { Link } from "react-router-dom";

var bcrypt = require("bcryptjs");

function UserEdit({ user, onClickCancel, onClickSave, mode }) {

    const [updatedUser, setUpdatedUser] = useState(user);
    const [valid, setValid] = useState(true);
    const errorField = useRef(null);
    const successMessage = useRef(null);
    const formField = useRef(null);
    const [successMsg, setSuccessMsg] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        let savedUser = null;
        if (mode === 'create') {
            savedUser = await usersApi.createUser(updatedUser);
        } else {
            savedUser = await usersApi.updateUser(updatedUser);
        }
        if (savedUser) {
            if (!savedUser.error && mode!=='personalInfo') {  
                setValid(savedUser.error ? false : true);
                errorField.current.value = savedUser.error;
                errorField.current.focus();
                onClickSave(savedUser);
            }else{
                setSuccessMsg( true);
                successMessage.current.value = 'Data is saved successfully.';
                successMessage.current.focus();
                setTimeout(() => {
                    setSuccessMsg(false);
                }, 3000);
            }
        }
    }

    function handleCancel() {
        onClickCancel();
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

    const handleRoleChanged = (event) => {
        updateUser(event);
    };

    function updateUser(event) {
        let value = "";
        if (event.target.name === "password") {
            value = bcrypt.hashSync(event.target.value, 8);
        } else {
            value = event.target.value;
        }
        setUpdatedUser({
            ...updatedUser,
            [event.target.name]: value,
        });
    }

    function onClickSubmit(event) {
        formField.current.dispatchEvent(new Event("submit", { cancelable: true }));
    }

    return (
        <div className='main-container'>
            <form onSubmit={handleSubmit} ref={formField}>
                <input type="text" className={valid ? "valid" : "invalid"} ref={errorField} readOnly />
                <input type="text" className={successMsg ? "visible-msg" : "invisible-msg"} ref={successMessage} readOnly />
                <label htmlFor="name">Name</label>
                <input type="text"
                    className="form-text"
                    id="name" name="name"
                    defaultValue={updatedUser.name}
                    onChange={handleNameChanged} />
                <label htmlFor="email">Email</label>
                <input type="text"
                    className="form-text"
                    id="email"
                    name="email"
                    defaultValue={updatedUser.email}
                    onChange={handleEmailChanged} />
                <label htmlFor="password">Password</label>
                <input type="password"
                    className="form-text"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    defaultValue={updatedUser.password}
                    onChange={handlePasswordChanged} />
                <label htmlFor="role">Role</label>
                {
                    isAdmin() ?
                        <select id="role"
                            name="role"
                            className='form-select'
                            value={updatedUser.role}
                            onChange={handleRoleChanged}>
                            <option value="Registered">Registered User</option>
                            <option value="admin">Administrator</option>
                        </select>
                        : <></>
                }
                <div>
                    <span onClick={onClickSubmit} className="UserEdit-button fas fa-save" />
                    {
                        mode === 'personalInfo' ?
                            <Link to="/" id="cancel-btn">
                                <span className="UserEdit-delete fas fa-close" id="cancel" />
                            </Link>
                            :
                            <span className="UserEdit-delete fas fa-close" id="cancel"
                                onClick={handleCancel}
                            ></span>
                    }
                </div>
            </form>
        </div>
    );
}

UserEdit.propTypes = {
    user: UserType.isRequired,
};

export default UserEdit;
