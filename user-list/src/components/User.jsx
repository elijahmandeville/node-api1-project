import React from "react";
import faker from "faker";

function User(props) {
  return (
    <div className="wrapper">
      <div className="ui raised link card">
        <div className="content">
          <div className="header">{props.user.name}</div>
          <div className="meta">
            <span className="category">{props.user.id}</span>
          </div>
          <div className="description">
            <p>{props.user.bio}</p>
          </div>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <img className="ui avatar image" src={faker.image.avatar()} />{" "}
            {props.user.name}
          </div>
        </div>
        <button
          className="ui primary button"
          onClick={() => props.deleteUser(props.user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;
