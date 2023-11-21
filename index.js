require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const coffeeshopRoutes = require("./routes/coffeeshops.js");
const profileRoutes = require("./routes/profile.js");
const authRoutes = require("./routes/auth.js");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/coffeeshops", coffeeshopRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
