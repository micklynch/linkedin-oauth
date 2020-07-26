const express = require("express"); // call express
var cors = require("cors");
const axios = require("axios");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
const router = express.Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const callback_url = process.env.CALLBACK_URL;

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/getMe", (req, res) => {
  var url = "https://api.linkedin.com/v2/me";
  var access_token = req.cookies.access_token;
  axios
    .get(url, {
      headers: { Authorization: "Bearer " + access_token },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(console.log);
});

router.get("/callback", (req, res) => {
  var authCode = req.query.code;

  if (authCode) {
    var form = {
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: callback_url,
      client_id: client_id,
      client_secret: client_secret,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    var url = "https://www.linkedin.com/oauth/v2/accessToken";
    axios
      .post(url, querystring.stringify(form), config)
      .then((response) => {
        var access_token = response.data.access_token;
        res.statusCode = 302;
        res.setHeader("Location", "http://localhost:8080/profile");
        res.cookie("access_token", access_token, {
          maxAge: 60 * 60 * 1000, // cookie lasts an hour
          httpOnly: true,
          // secure: true,
        });
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("Error");
  }
});

app.use("/api", router);
app.listen(port);
console.log("Magic happens on port " + port);
