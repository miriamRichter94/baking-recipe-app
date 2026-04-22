import dbConnect from "@/db/dbConnect";
import Recipe from "@/db/models/recipe";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const recipes = await Recipe.find({})
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");
      return response.status(200).json(recipes);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const recipe = await Recipe.create(request.body);
      return response.status(201).json(recipe);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ stauts: "Method not allowed." });
}
