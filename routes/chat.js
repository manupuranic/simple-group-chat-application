const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res, next) => {
  fs.readFile("message.txt", (err, data) => {
    res.send(
      `<p>${data ? data : "No text Found"}</p>
      <form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action='/' method='POST'>
      <input type='text' name='message'>
      <input type="hidden" name='user' id='username'>
      <button type='submit'>Send</button></form>`
    );
  });
});

router.post("/", (req, res, next) => {
  const message = `${req.body.user} : ${req.body.message}`;
  fs.appendFile("message.txt", message, (err) => {
    res.redirect("/");
  });
});

module.exports = router;
