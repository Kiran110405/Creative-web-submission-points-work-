const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  isAdmin: { type: Boolean, default: false }, //Added for submission point 2
});

const userData = model("user", userSchema);

async function addUser(username, password, firstName, lastName) {
  // Check if username already exists
  let found = await userData.findOne({ username }).exec();
  if (found) return false;

  // Create new user
  await userData.create({
    username,
    password,
    firstName,
    lastName,
  });

  return true;
}

// LOGIN USER

async function checkUser(usernameFromForm, password) {
  // let found=userData.find(thisUser=>thisUser.username==username)
  let found = null;
  found = await userData.findOne({ username: usernameFromForm }).exec();
  if (found) {
    return found.password == password;
  } else {
    return false;
  }
  //return boolean true if it matches else false
}

module.exports = {
  addUser,
  checkUser,
  userData,
};
