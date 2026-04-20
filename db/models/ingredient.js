import mongoose from "mongoose";

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: String,
  nameDe: String,
  category: String,
});

const Ingredient =
  mongoose.models.Ingredient || mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
