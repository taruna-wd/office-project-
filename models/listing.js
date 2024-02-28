const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database  not connected");
  });


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  images: {
    type: String,
    set: (v) => (v === "" ? "default link" : v),
  },

  country: {
    type: String,
    required: true,
  },
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
