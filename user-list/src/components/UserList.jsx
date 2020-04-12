import React from "react";
import User from "./User";
import "../App.css";
import axios from "axios";

function UserList({ users, getUsers }) {
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const addUser = (data) => {};

  return (
    <div className="userListWrapper">
      <div className="userContainer">
        {users.map((item, idx) => {
          return <User deleteUser={deleteUser} user={item} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default UserList;
