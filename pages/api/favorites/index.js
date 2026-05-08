import dbConnect from "@/db/dbConnect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  try {
    if (request.method === "GET") {
      if (!session)
        return response.status(401).json({ status: "Not authorized" });
      const token = await getToken({ req: request });
      const user = await User.findOne({ discordId: token?.sub }).populate(
        "favorites"
      );
      return response.status(200).json(user?.favorites ?? []);
    }
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
