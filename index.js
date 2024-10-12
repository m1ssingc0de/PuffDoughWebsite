var groupId = 9153980;

require('dotenv').config()
const express = require("express");
const path = require('path');
const rbx = require("noblox.js");
const app = express();

console.log("Rank bot by missing")

const cookie = process.env.RBXCOOKIE;

app.use(express.static(path.join(__dirname, 'public')));

async function startApp() {
  await rbx.setCookie(cookie);
}
startApp();

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get("/v1/rank", (req, res) => {
  var User = req.headers.userid;
  var Rank = req.headers.rank;
  var Passkey = req.headers.authorization;

  // Check for missing arguments
  if (!Passkey || !Rank || !User) {
    return res.status(403).json({
      success: false,
      errorcode: "one or more arguments missing",
    });
  }

  // Check if passkey is correct
  if (Passkey !== process.env.PASSKEY) {
    return res.status(403).json({
      success: false,
      errorcode: "incorrect passkey",
    });
  }

  // Convert User and Rank to numbers (if not already)
  const userId = parseInt(User);
  const rankId = parseInt(Rank);

  // Validate if User and Rank are valid numbers
  if (isNaN(userId) || isNaN(rankId)) {
    return res.status(400).json({
      success: false,
      errorcode: "userid or rank is not a valid number",
    });
  }

  console.log("Ranking " + userId + " to " + rankId);

  // Attempt to set the rank using noblox.js
  rbx.setRank(groupId, userId, rankId)
    .then(() => {
      return res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        success: false,
        errorcode: "failed to set rank",
        message: err.message,
      });
    });
});


app.get("/v1*", (req, res) => {
  return res.status(404).json("No webpage found")
  })

app.get("*", (req, res) => {
return res.sendFile(path.join(__dirname,'views','Random.html'));
})

const listener = app.listen(process.env.PORT, () => {
  console.log("PORT:" + listener.address().port);
});
