import dbConnect from "@/db/dbConnect";
import Unit from "@/db/models/unit";
import { starterUnits } from "@/lib/data";

export default async function unitSeed() {
  await dbConnect();

  const unitCount = await Unit.countDocuments();

  if (unitCount === 0) {
    // execute Seed
    await Unit.insertMany(starterUnits);
  }
}
