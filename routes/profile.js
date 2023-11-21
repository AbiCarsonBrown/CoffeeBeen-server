const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authenticate = require("../middleware/authenticate");

router.route("/been").get(authenticate, async (req, res) => {
  try {
    const data = await knex("visit")
      .where({ "visit.user_id": req.user_id })
      .where({ visited: true });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving visited coffee shops: ${error}`);
  }
});

module.exports = router;
