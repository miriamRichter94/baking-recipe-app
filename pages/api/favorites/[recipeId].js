import dbConnect from "@/db/dbConnect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!session) return response.status(401).json({ status: "Not authorized" });

  await dbConnect();
  const token = await getToken({ req: request });
  const userId = token?.sub;
  const { recipeId } = request.query;

  try {
    if (request.method === "POST") {
      const existingUser = await User.findOneAndUpdate(
        { discordId: userId },
        {},
        { upsert: true, new: true }
      );

      const alreadyFavorited = existingUser.favorites.some(
        (id) => id.toString() === recipeId
      );

      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        alreadyFavorited
          ? { $pull: { favorites: recipeId } }
          : { $addToSet: { favorites: recipeId } },
        { new: true }
      );

      return response.status(200).json(updatedUser.favorites);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
