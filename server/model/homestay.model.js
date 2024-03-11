const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const HomeStaySchema = new Schema({
  name_homestay: { 
    type: String, require: true 
  },
  type_homestay: { 
    type: String, require: true 
  },
  detail_homestay: { 
    type: String  , require: true 
  },
  time_checkin_homestay: {
     type: String, require: true 
    },
  time_checkout_homestay: {
     type: String, required: true 
    },
  policy_cancle_homestay: {
     type: String, required: true 
    },
  location: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Location' }], required: true 
     },
     image: {
      type: [
        {
          image: {
            type: String,
          },
        },
      ],
      required: [true, 'At least one activity must be provided'],
    },
  max_people: {
    type: Number, required: true 
    },
  bathroom_homestay: {
    type: String, required: true 
    },
  bedroom_homestay: {
     type: String, required: true 
    },
  sizebed_homestay: {
     type: String , require: true
    },
  facilities: {
    type: [{ type: Schema.Types.ObjectId, ref: 'facilities_name' }], required: true 
    },
  price_homestay: {
     type: Number, required: true 
    },
  business_user: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Business_User' }], required: true 
    },
  review_rating_homestay: {
     type: Number, required: true 
    },
  status_sell_homestay: {
     type: Boolean, required: true 
    },
});
const HomeStayModel = model("HomeStay", HomeStaySchema);
module.exports = HomeStayModel;
