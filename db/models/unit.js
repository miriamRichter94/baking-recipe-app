import mongoose from "mongoose";

const { Schema } = mongoose;

const unitSchema = new Schema({
  name: String,
  abbreviation: String,
});

const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

export default Unit;
