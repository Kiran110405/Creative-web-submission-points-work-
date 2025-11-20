const express = require("express");
const app = express();
const path = require("path");

const posts = require("./models/posts.js");
const userModel = require("./models/users.js");

const sessions = require("express-session");
const cookieParser = require("cookie-parser");

const threeMinutes = 3 * 60 * 1000;
const oneHour = 1 * 60 * 60 * 1000;

const dotenv = require("dotenv").config();
const mongoDBUsername = process.env.mongoDBUsername;
const mongoDBPassword = process.env.mongoDBPassword;
const mongoAppName = process.env.mongoAppName;
console.log(mongoDBUsername, mongoDBPassword, mongoAppName);
const connectionString = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.lpfnqqx.mongodb.net/${mongoAppName}?retryWrites=true&w=majority`;

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); ///?///////

const mongoose = require("mongoose");
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  sessions({
    secret: "my own secret phrase",
    cookie: { maxAge: threeMinutes },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));

function checkLoggedIn(request, response, nextAction) {
  if (!request.session || !request.session.username) {
    return response.sendFile(
      path.join(__dirname, "/views", "notloggedin.html")
    );
  }
  nextAction();
}

function checkAdmin(req, res, next) {
  if (!req.session || !req.session.username) {
    return res.send("Not logged in."); //responsds with this if the user/admin is not logged in
  }

  userModel.userData
    .findOne({ username: req.session.username }) //check if the username is the same as the one that logged in
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.send("Access denied. Admins only");
      }
      next();
    });
} //added for submission 2

function checkedLoggedInState(request) {
  return request.session && request.session.username;
}

app.get("/app", checkLoggedIn, async (request, response) => {
  // response.sendFile(path.join(__dirname, '/views', 'app.html'))
  response.render("pages/app", {
    username: request.session.username,
    isLoggedIn: checkedLoggedInState(request),
    posts: await posts.getLatestNPosts(3),
  });
});

// app.get("/profile", checkLoggedIn, (request, response) => {
//   response.sendFile(path.join(__dirname, "/views", "profile.html"));
// });

app.get("/getposts", async (request, response) => {
  response.json({ posts: await posts.getLatestNPosts(3) });
});

app.post("/newpost", (request, response) => {
  posts.addPost(request.body.message, request.session.username);
  response.sendFile(path.join(__dirname, "/views", "app.html"));
});

app.get("/login", (request, response) => {
  //response.sendFile(path.join(__dirname, "/views", "login.html"));
  response.render("pages/login.ejs", {
    isLoggedIn: checkedLoggedInState(request),
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const valid = await userModel.checkUser(username, password);

  if (!valid)
    return res.sendFile(path.join(__dirname, "/views", "notloggedin.html"));

  // Save session
  req.session.username = username;

  const user = await userModel.userData.findOne({ username });

  if (user.isAdmin) {
    // Redirect admins to admin page
    return res.redirect("/admin");
  }

  // Regular user profile
  res.render("pages/profile", {
    firstName: user.firstName,
    lastName: user.lastName,
    username: req.session.username,
    isAdmin: user.isAdmin,
    isLoggedIn: checkedLoggedInState(req),
    posts: await posts.getLatestNPosts(3),
  });
});

app.get("/admin", checkAdmin, async (req, res) => {
  const allUsers = await userModel.userData.find({}, "-password"); // exclude passwords
  const allPosts = await posts.getLatestNPosts(100);

  res.render("pages/admin", {
    users: allUsers,
    posts: allPosts,
    username: req.session.username,
  });
}); //added for submission 2

app.post("/admin/deleteUser/:id", checkAdmin, async (req, res) => {
  await userModel.userData.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
}); //added for submission 2

app.post("/admin/deletePost/:id", checkAdmin, async (req, res) => {
  await posts.postData.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
}); // added for submission 2

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "register.html"));
});

app.get("/logout", checkLoggedIn, (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "logout.html"));
});

app.post("/logout", (request, response) => {
  request.session.destroy();
  response.redirect("/");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    // Attempt to add user
    let success = await userModel.addUser(
      username,
      password,
      firstName,
      lastName
    );

    if (!success) {
      return res.sendFile(
        path.join(__dirname, "/views", "registration_failed.html")
      );
    }

    // Save session
    req.session.username = username;

    // Redirect to profile
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.send("Registration error");
  }
});

app.get("/profile", checkLoggedIn, async (req, res) => {
  try {
    const user = await userModel.userData.findOne({
      username: req.session.username,
    });

    if (!user) {
      return res.send("User not found.");
    }
    // console.log("render profile");
    // console.log(user);
    res.render("pages/profile", {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    console.error(err);
    res.send("Profile error");
  }
});
