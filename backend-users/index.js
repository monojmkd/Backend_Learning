require("dotenv").config();
const sequelize = require("./lib/sequelize");
const userModel = require("./models/user");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const users = [
  {
    id: 1,
    username: "octocat",
    name: "The Octocat",
    repoCount: 8,
    location: "San Francisco",
  },
  {
    id: 2,
    username: "torvalds",
    name: "Linus Torvalds",
    repoCount: 25,
    location: "Portland",
  },
  {
    id: 3,
    username: "gaearon",
    name: "Dan Abramov",
    repoCount: 50,
    location: "London",
  },
  {
    id: 4,
    username: "addyosmani",
    name: "Addy Osmani",
    repoCount: 42,
    location: "Mountain View",
  },
  {
    id: 5,
    username: "tj",
    name: "TJ Holowaychuk",
    repoCount: 150,
    location: "Victoria",
  },
];

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching all users" });
  }
});

app.get("/users/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let user = await userModel.findByPk(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User Not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
