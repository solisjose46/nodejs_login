//import env vars
require("dotenv").config();

//get required dependacies
//const express = require("express");
const app = express();
const mongoose = require("mongoose");

//app constants
const path = require("path");
const htmlPath = process.env.HTML_PATH;
const appDB = process.env.MONGO_DB;

//to extract post body
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(appDB).then(() => {
  app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
  });
  //GET
  app.get("/login", (req, res) => {
    res.sendFile(path.join(htmlPath, "/login.html"));
  });

  //POST
  app.post("/login", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
  });
});
