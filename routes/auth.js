const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;

  if (!full_name || !username || !email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    full_name,
    username,
    email,
    password: hashedPassword,
  };

  try {
    await knex("user").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed registration");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }

  const user = await knex("user").where({ email: email }).first();
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!user || !isPasswordCorrect) {
    return res.status(400).send("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
});

module.exports = router;
