const mongoose = require("mongoose");

const notApprovedAssetSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  enterDate: {
    type: String,
    required: true,
  },
  exitDate: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pricePer: {
    type: String,
    required: true,
  },
  roomsNumber: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    required: true,
  },
  isSublet: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  updatedOn: {
    type: String,
    required: true,
  },
  pricePerMonth: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notApproved: {
    type: Boolean,
    default: true,
  },
});

const notApprovedAsset = mongoose.model(
  "notApprovedAsset",
  notApprovedAssetSchema
);
module.exports = notApprovedAsset;
