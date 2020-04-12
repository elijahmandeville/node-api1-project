import React, { useState, useEffect } from "react";
import "./App.css";
import UserList from "./components/UserList";
import AddForm from "./components/AddForm";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>App Content</h1>
      <AddForm getUsers={getUsers} />
      <UserList users={users} getUsers={getUsers} />
    </div>
  );
}

export default App;
