const mongoose = require("mongoose");

const customerServiceSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const CustomerService = mongoose.model(
  "CustomerService",
  customerServiceSchema
);
module.exports = CustomerService;
