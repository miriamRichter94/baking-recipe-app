import dbConnect from "@/db/dbConnect";
import Pantry from "@/db/models/pantry";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!session) return response.status(401).json({ status: "Not authorized" });

  await dbConnect();
  const token = await getToken({ req: request });
  const userDiscordId = token?.sub;
  const { ingredientId } = request.query;

  try {
    if (request.method === "PUT") {
      const { amount, unit } = request.body;

      if (amount === undefined || amount === null) {
        return response.status(400).json({ status: "amount is required" });
      }
      if (Number(amount) <= 0) {
        return response
          .status(400)
          .json({ status: "amount must be greater than 0" });
      }

      const update = { "ingredients.$.amount": Number(amount) };
      if (unit) update["ingredients.$.unit"] = unit;

      const pantry = await Pantry.findOneAndUpdate(
        { userDiscordId, "ingredients.ingredient": ingredientId },
        { $set: update },
        { new: true }
      )
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      if (!pantry) {
        return response
          .status(404)
          .json({ status: "Ingredient not found in pantry" });
      }

      return response.status(200).json(pantry.ingredients);
    }

    if (request.method === "DELETE") {
      const pantry = await Pantry.findOneAndUpdate(
        { userDiscordId },
        { $pull: { ingredients: { ingredient: ingredientId } } },
        { new: true }
      )
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      if (!pantry) {
        return response.status(404).json({ status: "Pantry not found" });
      }

      return response.status(200).json(pantry.ingredients);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
