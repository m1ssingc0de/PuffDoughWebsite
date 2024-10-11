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
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();

<<<<<<< HEAD
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get("/v1/rank", (req, res) => {
  var User = req.headers.userid;
  var Rank = req.headers.rank;
  var Passkey = req.headers.authorization;

  if (Passkey == null || Rank == null || User == null) {
    return res.status(403).json({
     success:false,
     errorcode:"one or more arguments missing"
  });
  }

app.get("", (req,res) => {
  res.json("Rank Bot! - By Missing");
});

app.get("/ranker", (req, res) => {
  var User = req.params.userid;
  var Rank = req.params.rank;
  var Passkey = req.params.passkey;
>>>>>>> 8c56488695452e1d6c9e37543e09e7c833e3da68

  if (Passkey !== process.env.PASSKEY) {
    return res.status(403).json({
      success:false,
      errorcode:"incorrect passkey"
    });
  }
  rbx.setRank(groupId, parseInt(User), parseInt(Rank))
  return res.json({
    success:true,
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
