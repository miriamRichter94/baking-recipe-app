import dbConnect from "@/db/dbConnect";
import Recipe from "@/db/models/recipe";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const { ids } = request.query;

      const query = ids ? { _id: { $in: ids.split(",") } } : {};

      const recipes = await Recipe.find(query)
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      return response.status(200).json(recipes);
    }

    if (request.method === "POST") {
      const recipe = await Recipe.create(request.body);
      return response.status(201).json(recipe);
    }
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
