import dbConnect from "@/db/dbConnect";
import Ingredient from "@/db/models/ingredient";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const ingredients = await Ingredient.find();
    return response.status(200).json(ingredients);
  }

  return response.status(405).json({ stauts: "Method not allowed." });
}
