const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../../.env` });

mongoose
  .connect(
    `mongodb+srv://galmalach:1233212@easyrent.z6jwkff.mongodb.net/easyrent?retryWrites=true&w=majority
  `,
    {}
  )
  .then(() => console.log(`mongodb connected!`))
  .catch((err) => console.log(err));
