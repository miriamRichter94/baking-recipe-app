import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  bakingForm: {
    shape: { type: String, enum: ["round", "rect"] },
    diameter: Number,
    width: Number,
    length: Number,
  },

  steps: [
    {
      order: Number,
      instruction: String,
      image: String,
    },
  ],

  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
      amount: Number,
      unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    },
  ],
});

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
