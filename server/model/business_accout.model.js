const mongoose = require('mongoose');
const { Schema } = mongoose;
const Account = require('./account');  // Import account schema

const businessSchema = new Schema({
  business_name: { type: String, required: true },
  business_backName: { type: String, required: true },
  business_banking_Name: { type: String, required: true },
  business_banking_code: { type: Number, required: true },
  
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;