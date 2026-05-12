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

  try {
    if (request.method === "GET") {
      const pantry = await Pantry.findOne({ userDiscordId })
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");
      return response.status(200).json(pantry?.ingredients ?? []);
    }

    if (request.method === "POST") {
      const { ingredient, amount, unit } = request.body;

      if (!ingredient || !unit || amount === undefined || amount === null) {
        return response
          .status(400)
          .json({ status: "ingredient, amount and unit are required" });
      }
      if (Number(amount) <= 0) {
        return response
          .status(400)
          .json({ status: "amount must be greater than 0" });
      }

      const pantry = await Pantry.findOneAndUpdate(
        { userDiscordId },
        { $setOnInsert: { userDiscordId } },
        { upsert: true, new: true }
      );

      const alreadyInPantry = pantry.ingredients.some(
        (item) => item.ingredient.toString() === ingredient
      );

      if (alreadyInPantry) {
        return response
          .status(409)
          .json({ status: "Ingredient already in pantry" });
      }

      pantry.ingredients.push({
        ingredient,
        amount: Number(amount),
        unit,
      });
      await pantry.save();

      const populated = await Pantry.findById(pantry._id)
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      return response.status(201).json(populated.ingredients);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
