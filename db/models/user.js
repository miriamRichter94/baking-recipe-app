import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  discordId: { type: String, required: true, unique: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
