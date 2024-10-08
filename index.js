var groupId = 9153980;

require('dotenv').config()
const express = require("express");
const rbx = require("noblox.js");
const app = express();

console.log("Rank bot by missing")

const cookie = process.env.RBXCOOKIE;

app.use(express.static("public"));

async function startApp() {
  await rbx.setCookie(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();

app.get("/ranker", (req, res) => {
  var User = req.param("userid");
  var Rank = req.param("rank");
  var Passkey = req.param("passkey");

  if (Passkey !== process.env.PASSKEY) {
    return res.status(403).json("Invalid passkey!");
  }
  rbx.setRank(groupId, parseInt(User), parseInt(Rank))
  res.json("Ranked!");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("PORT:" + listener.address().port);
});
