import mongoose from "mongoose";

const { Schema } = mongoose;

const pantrySchema = new Schema(
  {
    userDiscordId: { type: String, required: true, unique: true, index: true },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        amount: { type: Number, required: true, min: 0 },
        unit: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
      },
    ],
  },
  { timestamps: true }
);

const Pantry = mongoose.models.Pantry || mongoose.model("Pantry", pantrySchema);

export default Pantry;
