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

router.route("/visits").get(authenticate, async (req, res) => {
  try {
    const visits = await knex("coffeeshop")
      .leftOuterJoin("visit", function () {
        this.on("coffeeshop.id", "=", "visit.coffeeshop_id").andOn(
          "visit.user_id",
          "=",
          req.user_id
        );
      })
      .select(
        "coffeeshop.id as coffeeshop_id",
        "coffeeshop.coffeeshop_name",
        "coffeeshop.address",
        "coffeeshop.longitude",
        "coffeeshop.latitude",
        "visit.id as visit_id",
        "visit.visited",
        "visit.on_wishlist",
        "visit.rating",
        "visit.review"
      )
      .where({ "visit.user_id": req.user_id })
      .orWhereNull("visit.user_id");

    res.status(200).json(visits);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error retrieving user: ${error}`);
  }
});

module.exports = router;
