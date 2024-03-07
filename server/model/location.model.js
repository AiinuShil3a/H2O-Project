const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const LocationSchema = new Schema({
  name_location: {
    type: String,
    require: true,
  },
  province_location: {
    type: String,
    require: true,
  },
  district_location: {
    type: String,
    require: true,
  },
  subdistrict_location: {
    type: String,
    require: true,
  },
  zipcode_location: {
    type: Number,
    require: true,
  },
  latitude_location: {
    type: String,
    require: true,
  },
  longitude_location: {
    type: String,
    require: true,
  },
  radius_location: {
    type: Number,
    require: true,
  },
});
const LocationModel = model("Location", LocationSchema);
module.exports = LocationModel;
