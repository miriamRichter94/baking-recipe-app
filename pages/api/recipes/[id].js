import dbConnect from "@/db/dbConnect";
import Recipe from "@/db/models/recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const recipe = await Recipe.findById(id)
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      if (!recipe) return response.status(400).json({ status: "bad request" });
      return response.status(200).json(recipe);
    }

    if (request.method === "PUT") {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, request.body, {
        new: true,
      });

      if (!updatedRecipe) {
        return response.status(404).json({ message: "Recipe not found" });
      }

      return response.status(200).json(updatedRecipe);
    }
  } catch (error) {
    response.status(500).json({ messgae: "Internal Server Error." });
    return;
  }

  response.status(405).json({ stauts: "Method not allowed." });
}
