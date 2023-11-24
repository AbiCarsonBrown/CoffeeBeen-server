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

router
  .route("/visits")
  .get(authenticate, async (req, res) => {
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
          "visit.user_id",
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
      res.status(400).send(`Error retrieving user visits: ${error}`);
    }
  })
  .post(authenticate, async (req, res) => {
    const { coffeeshop_id, visited, on_wishlist, rating, review } = req.body;

    const newVisit = {
      coffeeshop_id,
      user_id: req.user_id,
      visited,
      on_wishlist,
      rating,
      review,
    };

    try {
      await knex("visit").insert(newVisit);
      res.status(201).send("User input successfully posted");
    } catch (error) {
      console.error(error);
      res.status(400).send(`Error posting user input: ${error}`);
    }
  })
  .put(authenticate, async (req, res) => {
    const { visit_id, user_id, visited, on_wishlist, rating, review } =
      req.body;

    if (user_id !== req.user_id) {
      return res.status(403).send(`User not authorised to change this data`);
    }

    updatedVisit = {
      visited,
      on_wishlist,
      rating,
      review,
    };

    try {
      await knex("visit").where({ id: visit_id }).update(updatedVisit);
      res.status(201).send("User input successfully posted");
    } catch (error) {
      console.error(error);
      res.status(400).send(`Error posting user input: ${error}`);
    }
  });

router.route("/visits/:id").get(authenticate, async (req, res) => {
  try {
    const visit = await knex("visit")
      .where({ "visit.user_id": req.user_id })
      .where({ "visit.coffeeshop_id": req.params.id })
      .select(
        "visit.user_id",
        "visit.id as visit_id",
        "visit.visited",
        "visit.on_wishlist",
        "visit.rating",
        "visit.review"
      );
    res.status(200).json(visit);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error retrieving user visit: ${error}`);
  }
});

module.exports = router;
