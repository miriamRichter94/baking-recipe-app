import dbConnect from "@/db/dbConnect";
import Unit from "@/db/models/unit";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const units = await Unit.find();
    return response.status(200).json(units);
  }

  return response.status(405).json({ stauts: "Method not allowed." });
}
