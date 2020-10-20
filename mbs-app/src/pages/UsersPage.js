import React, { useEffect, useState } from "react";
import UserItem from "../components/UserItem/UserItem";
import UserEdit from "../components/UserItem/UserEdit";
import usersApi from "../service/users-api";
import bettingsApi from "../service/bettings-api";

function UsersPage() {

  const [users, setUsers] = useState([]);
  const [formType, setFormType] = useState('list');
  const [editUser, setEditUser] = useState();
  const [mode, setMode] = useState('update');

  useEffect(() => {
    async function getUsers() {
      setUsers(await usersApi.getUsers());
    }
    getUsers();
  }, []);

  function handleEditClick(user) {
    setFormType('edit');
    setEditUser(user);
  }

  async function handleDeleteClick(userToDelete) {
    await usersApi.deleteUser(userToDelete._id);
    const bettings = await bettingsApi.getBettings(userToDelete._id);
    bettings.map(async (betting) => {
        await bettingsApi.deleteBettingByUser(betting.user._id);
    });
    setUsers(users.filter(user => user._id !== userToDelete._id));
  }

  function handleCancelClick() {
    setFormType('list');
  }

  async function handleSaveClick(updatedUser) {
    setEditUser(updatedUser);
    if (mode === 'create') {
      setUsers(users.concat(updatedUser));
    } else {
      setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
    }
    setFormType('list');
  }

  async function handleCreate() {
    setFormType('edit');
    setMode('create');
    setEditUser({});
  }

  return (
    <div className="users">
      <img src="../../../images/users.png" id="user-image" alt="users" />
      {
        formType === 'list' ?
          <span className="UserItem-create fas fa-plus" title="create"
            onClick={() => { handleCreate() }}>
          </span>
          : <></>
      }
      {
        users.map((user) => (
          <React.Fragment key={user._id}>
            {
              formType === 'list' ?
                <UserItem user={user}
                  onClickEdit={handleEditClick}
                  onClickDelete={handleDeleteClick} />
                : <></>
            }
          </React.Fragment>
        ))
      }
      {formType === 'edit' ?
        <UserEdit user={editUser}
          onClickCancel={handleCancelClick}
          onClickSave={handleSaveClick}
          mode={mode} />
        : <></>
      }
    </div>

  );
}

export default UsersPage;