const mongoose = require("mongoose");
const Client = require("./client");
const Store = require("./store");
const Schema = mongoose.Schema;
const addOnSchema = require("./addon");

const currentDate = new Date().toISOString();

const AppointmentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  startTime: String,
  morningOrEvening: String,
  endTime: String,
  duration: Number,
  price: Number,
  createdAt: { type: Date, default: currentDate },
  client: Client.schema.obj,
  esthetician: String,
  store: Store.schema.obj,
  // treatments: [{ name: String, price: Number, duration: Number }],
  // addOns: [addOnSchema.schema.obj],
  confirmed: { type: Boolean, default: false },
  notes: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
