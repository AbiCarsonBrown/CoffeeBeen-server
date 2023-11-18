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

router.route("/:id").get(async (req, res) => {
  try {
    const coffeeShop = await knex("coffeeshop")
      .where({ "coffeeshop.id": req.params.id })
      .select(
        "coffeeshop.id",
        "coffeeshop.coffeeshop_name",
        "coffeeshop.address",
        "coffeeshop.description"
      );

    const visits = await knex("visit")
      .where({ "visit.coffeeshop_id": req.params.id })
      .join("user", "visit.user_id", "user.id")
      .select(
        "user.username",
        "visit.visited",
        "visit.on_wishlist",
        "visit.rating",
        "visit.review"
      );

    res.status(200).json([coffeeShop, visits]);
  } catch (error) {
    res.status(400).send(`Error retrieving coffee shop: ${error}`);
  }
});

module.exports = router;
