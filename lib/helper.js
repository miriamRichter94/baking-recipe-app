import { uploadImage } from "@/services/imageService";

export function createRecipeDataObject(
  formData,
  ingredientsList,
  recipeStepsList,
  url
) {
  let steps = [];
  recipeStepsList.map(
    (recipeStep) =>
      (steps = [
        ...steps,
        {
          order: recipeStep.order,
          instruction: recipeStep.instruction,
          image: recipeStep.image ?? "",
        },
      ])
  );

  return {
    title: formData.title,
    description: formData.description,
    image: url ?? "",
    bakingForm: {
      shape: formData.shape,
      // After (fixed)
      diameter: formData.diameter ? Number(formData.diameter) : undefined,
      width: formData.width ? Number(formData.width) : undefined,
      length: formData.length ? Number(formData.length) : undefined,
    },
    steps: steps,
    ingredients: ingredientsList,
  };
}

export function setRecipeIngredientsForForm(recipeIngredients) {
  if (!recipeIngredients) return [{ ingredient: "", amount: "", unit: "" }];

  let formRecipeIngredients = [];

  recipeIngredients.map(
    (recipeIngredient) =>
      (formRecipeIngredients = [
        ...formRecipeIngredients,
        {
          ingredient: recipeIngredient.ingredient._id,
          amount: recipeIngredient.amount
            ? Number(recipeIngredient.amount)
            : undefined,
          unit: recipeIngredient.unit._id,
        },
      ])
  );

  return formRecipeIngredients;
}

export async function uploadRecipeStepImages(recipeSteps) {
  return Promise.all(
    recipeSteps.map(async (recipeStep) => {
      if (!recipeStep.image) return recipeStep; // empty, skip
      if (
        typeof recipeStep.image === "string" &&
        recipeStep.image.includes("cloudinary")
      )
        return recipeStep; // already uploaded, keep it
      const { url } = await uploadImage(recipeStep.image); // File object, upload it
      return { ...recipeStep, image: url };
    })
  );
}

export function calculateShoppingList(recipes) {
  const allIngredients = recipes.flatMap((recipe) => recipe.ingredients);

  const merged = new Map();

  allIngredients.forEach(({ ingredient, amount, unit }) => {
    const key = `${ingredient.name}-${unit.name}`;

    if (merged.has(key)) {
      merged.get(key).amount += amount;
    } else {
      merged.set(key, {
        name: ingredient.name,
        unit: unit.name,
        amount: amount,
      });
    }
  });

  return Array.from(merged.values());
}
