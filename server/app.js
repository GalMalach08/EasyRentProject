const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: `${__dirname}/.env` });

// Database
require("./db");

// Authentication
const passport = require("passport");
const { jwtStrategy } = require("./middlewares/passport");

// Middleware configuration
app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Passport Middleware
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
const users = require("./routes/user.route");
app.use("/user", users);
const assets = require("./routes/asset.route");
app.use("/asset", assets);
const customerServiceRequest = require("./routes/customerService.route");
app.use("/customerService", customerServiceRequest);

// Production
app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// Port
const port = process.env.Port || 3001;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
