// Auth/userAuth.js
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

// Register a new user
exports.register = async (req, res, next) => {
  // console.log(req.body); // Add this for debugging
  const { username, email, password } = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            role: user.role
          },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json({
          message: "User successfully created",
          user: user._id
        })
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successfully created",
          error: error.message,
        })
      );
  });
}


// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  // Check if email and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "email or Password not present",
    })
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
            role: user.role, // Include the role here
            token
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }

}
// update the role of user
exports.update = async (req, res) => {
  const { role, id } = req.body;

  // First check if role and id is present
  if (!role || !id) {
    return res.status(400).json({ message: "Role or ID not provided" });
  }

  // Second check if the value of role is admin
  if (role !== "admin") {
    return res.status(400).json({ message: "Role must be admin" });
  }

  try {
    // Finds the user with the id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Third check the user is not an admin
    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an Admin" });
    }

    user.role = role;
    await user.save();
    res.status(200).json({ message: "Update successful", user });
  } catch (error) {
    res.status(400).json({ message: "An error occurred", error: error.message });
  }
}

// Delete a user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body
  await User.findById(id)
    .then(user => user.deleteOne())
    .then(user =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    )
}

// get all autheticated users
exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then(users => {
      const userFunction = users.map(user => {
        const container = {}
        container.username = user.username
        container.role = user.role
        return container
      })
      res.status(200).json({ user: userFunction })
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
}