const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  role: { type: String, required: true },
});

const roleModel = mongoose.model('Role', roleSchema);

module.exports = roleModel;