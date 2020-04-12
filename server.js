const express = require("express");
const cors = require("cors");
const db = require("./database");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.end();
});

server.post("/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.get("/users", (req, res) => {
  const users = db.getUsers();

  if (users) {
    res.json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }

  if (!user) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved.",
    });
  }
});
//////////////////////////////////////////////////
server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    try {
      db.deleteUser(user.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        errorMessage: `The user could not be removed. Error: ${error}`,
      });
    }
  }

  res.status(404).json({
    message: `The user with the specified ID does not exist.`,
  });
});
//////////////////////////////////////////////////
server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    if (!req.body.name || !req.body.bio) {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio,
    });

    if (!updatedUser) {
      res.status(500).json({
        errorMessage: "The user information could not be modified.",
      });
    }

    res.status(200).json(updatedUser);
  }
});

server.listen(8080, () => {
  console.log(`server running on port 8080`);
});
