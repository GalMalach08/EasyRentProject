const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../../.env` });

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUri, {})
  .then(() => console.log(`mongodb connected!`))
  .catch((err) => console.log(err));
