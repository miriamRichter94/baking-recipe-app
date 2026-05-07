import dbConnect from "@/db/dbConnect";
import Recipe from "@/db/models/recipe";
import {
  deleteRecipeImages,
  deleteImageFromCloudinary,
} from "@/lib/cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const recipe = await Recipe.findById(id)
        .populate("ingredients.ingredient")
        .populate("ingredients.unit");

      if (!recipe)
        return response.status(404).json({ status: "Recipe not found" });
      return response.status(200).json(recipe);
    }

    if (request.method === "PUT") {
      if (!session)
        return response.status(401).json({ status: "Not authorized" });
      const existingRecipe = await Recipe.findById(id);

      if (existingRecipe) {
        // Main image replaced
        const oldMainId = existingRecipe.image?.publicId;
        const newMainId = request.body.image?.publicId;
        if (oldMainId && oldMainId !== newMainId) {
          await deleteImageFromCloudinary(oldMainId);
        }

        // Step images replaced
        const oldSteps = existingRecipe.steps ?? [];
        const newSteps = request.body.steps ?? [];

        for (const oldStep of oldSteps) {
          const oldPubId = oldStep.image?.publicId;
          if (!oldPubId) continue;
          const matchingNewStep = newSteps.find(
            (s) => s.order === oldStep.order
          );
          const newPubId = matchingNewStep?.image?.publicId;
          if (oldPubId !== newPubId) {
            await deleteImageFromCloudinary(oldPubId);
          }
        }
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(id, request.body, {
        new: true,
      });

      if (!updatedRecipe) {
        return response.status(404).json({ message: "Recipe not found" });
      }

      return response.status(200).json(updatedRecipe);
    }

    if (request.method === "DELETE") {
      if (!session)
        return response.status(401).json({ status: "Not authorized" });
      const recipe = await Recipe.findById(id);
      if (recipe) {
        await deleteRecipeImages(recipe);
      }
      await Recipe.findByIdAndDelete(id);
      response.status(200).json({ message: "Success!" });
      return;
    }
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
