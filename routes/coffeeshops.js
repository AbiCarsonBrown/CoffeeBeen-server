const express = require("express");
const router = express.Router();
require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

router.route("/").get(async (_req, res) => {
  try {
    const data = await knex("coffeeshop");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving coffee shops: ${error}`);
  }
});

module.exports = router;
