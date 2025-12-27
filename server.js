const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json"));

  const user = users.find(u => u.username === username);
  if (!user) return res.send("❌ Invalid username");

  const match = await bcrypt.compare(password, user.password);
  if (match) res.send("✅ Login successful");
  else res.send("❌ Invalid password");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
