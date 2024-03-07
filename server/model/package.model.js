const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PackageSchema = new Schema({
  email: { type: String, require: true },
  price: { type: Number, require: true },
  name: { type: String, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, require: true },
});
const PackageModel = model("Package", PackageSchema);
module.exports = PackageModel;
