const express = require("express");
const path = require("path");
const app = express();
const PORT = 67;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CSS / JS / images (same folder)
app.use(express.static(__dirname));

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// login form submit
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.send("✅ Login successful");
  } else {
    res.send("❌ Invalid username or password");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
