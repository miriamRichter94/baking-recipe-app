import dbConnect from "@/db/dbConnect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (!session) return response.status(401).json({ status: "Not authorized" });

  const token = await getToken({ req: request });
  const userId = token?.sub;
  const { recipeId } = request.query;

  try {
    if (request.method === "POST") {
      const user = await User.findOneAndUpdate(
        { discordId: userId },
        {},
        { upsert: true, new: true }
      );

      const alreadyFavorited = user.favorites.some(
        (id) => id.toString() === recipeId
      );

      if (alreadyFavorited) {
        user.favorites = user.favorites.filter(
          (id) => id.toString() !== recipeId
        );
      } else {
        user.favorites.push(recipeId);
      }

      await user.save();
      return response.status(200).json(user.favorites);
    }
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
