import dbConnect from "@/db/dbConnect";
import Ingredient from "@/db/models/ingredient";
import { starterIngredients } from "@/lib/data";

export default async function ingredientSeed() {
  await dbConnect();

  const ingredientCount = await Ingredient.countDocuments();

  if (ingredientCount === 0) {
    // execute Seed
    await Ingredient.insertMany(starterIngredients);
  }
}
