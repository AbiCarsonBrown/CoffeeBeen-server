const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authenticate = require("../middleware/authenticate");

router.route("/").get(authenticate, async (req, res) => {
  try {
    const user = await knex("user").where({ id: req.user_id }).first();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error retrieving user: ${error}`);
  }
});

router.route("/been").get(authenticate, async (req, res) => {
  try {
    const data = await knex("visit")
      .where({ "visit.user_id": req.user_id })
      .join("coffeeshop", "visit.coffeeshop_id", "coffeeshop.id")
      .select(
        "visit.id",
        "visit.coffeeshop_id",
        "coffeeshop.coffeeshop_name",
        "coffeeshop.address",
        "visit.on_wishlist",
        "visit.rating",
        "visit.review"
      );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving coffee shops: ${error}`);
  }
});

module.exports = router;
