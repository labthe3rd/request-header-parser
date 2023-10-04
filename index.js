/*  Programmer:   labthe3rd
 *  Date:         10/3/2023
 *  Desc:         When an API request is received it returns ip, language, and user-agent
 *  Note:         This code was created to earn my Back End Development and API cert from freeCodeCamp
 */

// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Return the date in the response
app.get("/api/whoami", function (req, res) {
  let software = req.get("user-agent");
  let language = req.get("accept-language");
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  //return date-time
  res.json({
    ipaddress: ip,
    language: language,
    software: software,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
