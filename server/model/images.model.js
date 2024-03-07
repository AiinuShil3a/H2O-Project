const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ImagesSchema = new Schema({
    image_upload: { type: String }
});
const ImagesModel = model("Images", ImagesSchema);
module.exports = ImagesModel;