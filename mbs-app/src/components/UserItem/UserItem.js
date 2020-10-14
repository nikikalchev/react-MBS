import React, { useEffect } from "react";
import { UserType } from "../../model/user.model";
import "./UserItem.css";

function UserItem({ user }) {
    useEffect(() => {
    }, [])

    function handleUpdate() { }

    function handleDelete() { }

    return (
        <div className="UserItem">
            <div className="UserItem-left">
                <span className="UserItem-id">Name: <font>{user.name}</font></span>
                <span className="UserItem-id">Email: <font>{user.email}</font></span>
                <span className="UserItem-id">Role: <font>{user.role}</font></span>
            </div>
            <div className="UserItem-right">
                <span className="UserItem-button fas fa-edit"
                    onClick={handleUpdate}
                ></span>
                <span className="UserItem-button fas fa-trash-alt"
                    onClick={handleDelete}
                ></span>
            </div>
        </div>
    );
}

UserItem.propTypes = {
    user: UserType.isRequired,
};

export default UserItem;
