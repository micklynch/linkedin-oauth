const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// serve files from the public directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/public/profile.html");
});

app.listen(port);
console.log("Webserver up on port: " + port);
