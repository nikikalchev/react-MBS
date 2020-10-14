import React, { useEffect, useState } from "react";
import UserItem from "../components/UserItem/UserItem";
import bettingsApi from "../service/bettings-api";

function UsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      setUsers(await bettingsApi.getUsers());
    }
    getUsers();
  }, []);

  return (
    <div className="users">
      <img src="../../../images/users.png" id="user-image" alt="users" />
      {
        users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))
      }
    </div>
  );
}

export default UsersPage;