//import env vars
require("dotenv").config();

const { response } = require("express");
//get required dependacies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//app constants
const path = require("path");
const htmlPath = process.env.HTML_PATH;
const appDB = process.env.MONGO_DB;
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const users = mongoose.model("users", userSchema);

//to extract post body
app.use(
  express.urlencoded({
    extended: true,
  })
);
//read json requests
app.use(express.json());

//start the app
app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

//connect to database
mongoose.connect(appDB).then(() => {
  //GET
  app.get("/", (req, res) => {
    //check if authenticated, if not then redirect to /login
    //if so, then return index.html
    console.log("getting index");
    res.sendFile(path.join(htmlPath, "/index.html"));
  });

  app.get("/login", (req, res) => {
    console.log("getting login");
    res.sendFile(path.join(htmlPath, "/login.html"));
  });

  app.get("/login.js", (req, res) => {
    console.log("getting login");
    res.sendFile(path.join(htmlPath, "/login.js"));
  });

  app.get("/register", (req, res) => {
    console.log("getting register");
    res.sendFile(path.join(htmlPath, "/register.html"));
  });

  app.get("/reset", (req, res) => {
    console.log("getting reset");
    //check if user is logged in
    //if false then redirect to get /
    res.sendFile(path.join(htmlPath, "/reset-password.html"));
  });

  //POST
  app.post("/login", async (req, res) => {
    //check if user exists, if not then return generic error
    //if exists, hash password and compare to stored hashed password
    //if equal, then authenticate and redirect to /
    //if not then return generic error
    ////console.log("posting to login");

    let loginRespose = { type: false, message: "" };

    //check if empty
    if (req.body.username && req.body.password) {
      console.log("not empty");
      let result = await userExists(req.body.username);
      if (result) {
        console.log("I EXIST");
        loginRespose.type = true;
      } else {
        console.log("DNE");
        loginRespose.message = "DNE";
      }
    } else {
      console.log("empty");
      loginRespose.message = "EMPTY";
    }
    res.json(loginRespose);
  });

  app.post("/logout", (req, res) => {
    console.log("logging out!");
    console.log(req.body);
    res.sendStatus(200);
    //expire session and redirect to /login
  });

  app.post("/register", (req, res) => {
    console.log("register ...");
    console.log(req.body);
    res.sendStatus(200);
    //check if username or password empty, if true return 'empty' error
    //if not empty then check if username exists, if username exists then return generic error
    //if username does not exist then insert document into 'users' collective
  });

  app.post("/reset", (req, res) => {
    console.log("resetting");
    console.log(req.body);
    res.sendStatus(200);
    //check if password fields are empty, if empty return 'empty' error
    //check if new password and confirm password are the same, if not then throw 'not same' error
    //if the same then hash new password and overwrite password for user in user collective and redirect to /login
  });
});

//support functions
async function userExists(uname) {
  //if uname exists in user collective then return true
  const userExists = await users.exists({ username: uname });
  if (userExists) {
    return true;
  }
  return false;
}

function validPassword(uname, pass) {
  //assumes user exists in user collective, if hashed passwords match then return true
  return false;
}
