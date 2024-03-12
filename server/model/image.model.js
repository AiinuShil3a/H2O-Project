const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ImagesSchema = new Schema({
  image_upload: {
    type: String,
    required: true,
  },
});
module.exports = ImagesSchema;
