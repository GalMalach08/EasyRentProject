const express = require("express");
const router = new express.Router();
const CustomerServiceRequest = require("../db/models/customerService_schema");

// Upload request
router.post("/", async (req, res) => {
  try {
    const request = new CustomerServiceRequest({
      ...req.body,
    });
    const doc = await request.save();
    res.status(200).send({ request: doc });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error", error: err });
  }
});

module.exports = router;
