import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../App.css";
import axios from "axios";

const AddForm = (props) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    bio: "",
  });

  const handleChanges = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users", updatedUser)
      .then((res) => props.getUsers())
      .catch((err) => console.log(err));
    toggle();
  };

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="modal-wrapper">
      <Button color="primary" onClick={toggle}>
        {buttonLabel} Add
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="modal-header">
          Add a New User
        </ModalHeader>
        <form class="ui form" onSubmit={handleSubmit}>
          <div class="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChanges}
              value={updatedUser.name}
            />
          </div>
          <div class="field">
            <label>Bio: </label>
            <textarea
              type="text"
              name="bio"
              onChange={handleChanges}
              value={updatedUser.bio}
            />
          </div>
          <button class="ui primary button" type="submit">
            Submit
          </button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </form>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default AddForm;
