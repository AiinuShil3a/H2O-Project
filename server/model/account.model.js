const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: Number , require:true },
  birthday: { type: Date, required: true },
  image: { type: String, required: true },
  role: { type: String, required: true },
});

const accountModel = mongoose.model('Account', accountSchema);

module.exports = accountModel;