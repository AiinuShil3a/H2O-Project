const mongoose = require("mongoose");
const { Schema } = mongoose;
const LocationSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
module.exports = LocationSchema;
