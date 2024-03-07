const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PackageSchema = new Schema({
  name_package: {
    type: String,
    require: true,
  },
  type_package: {
    type: String,
    require: true,
  },
  max_people: {
    type: Number,
    require: true,
  },
  detail_package: {
    type: String,
    require: true,
  },
  activity_package: {
    type: [{ activity_name: String }],
    required: true,
  },
  time_start_package: {
    type: Date,
    required: true,
  },
  time_end_package: {
    type: Date,
    required: true,
  },
  policy_cancel_package: {
    type: String,
    required: true,
  },
  Address: {
    type: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    required: true,
  },
  image: {
    type: [{ type: Schema.Types.ObjectId, ref: "Images" }],
    required: true,
  },
  price_package: {
    type: Number,
    required: true,
  },
  homestay: {
    type: [{ type: Schema.Types.ObjectId, ref: "Homestay" }],
  },
  business_user: {
    type: [{ type: Schema.Types.ObjectId, ref: "Business_User" }],
    required: true,
  },
  review_rating_package: {
    type: Number,
    required: true,
  },
});
const PackageModel = model("Package", PackageSchema);
module.exports = PackageModel;
