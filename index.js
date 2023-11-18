const express = require("express");
const app = express();
const coffeeshopRoutes = require("./routes/coffeeshops.js");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/coffeeshops", coffeeshopRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
