import { uploadImage } from "@/services/imageService";

export function createRecipeDataObject(
  formData,
  ingredientsList,
  recipeStepsList,
  image
) {
  let steps = [];
  recipeStepsList.map(
    (recipeStep) =>
      (steps = [
        ...steps,
        {
          order: recipeStep.order,
          instruction: recipeStep.instruction,
          image: recipeStep.image ?? {},
        },
      ])
  );

  return {
    title: formData.title,
    description: formData.description,
    image: image ?? {},
    bakingForm: {
      shape: formData.shape,
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
      if (!recipeStep.image) return recipeStep;
      if (
        typeof recipeStep.image === "object" &&
        recipeStep.image.url?.includes("cloudinary")
      )
        return recipeStep;
      const { url, publicId } = await uploadImage(recipeStep.image);
      return { ...recipeStep, image: { url, publicId } };
    })
  );
}

export function calculateShoppingList(recipes, recalculatedRecipes) {
  const allIngredients = recipes.flatMap((recipe) => {
    const scalingFactor = recalculatedRecipes[recipe._id]?.scalingFactor ?? 1;
    return recipe.ingredients.map(({ ingredient, amount, unit }) => ({
      ingredient,
      amount: Math.round(amount * scalingFactor * 100) / 100,
      unit,
    }));
  });
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

export function calculateScalingFactor(
  originalShape,
  originalDiameter = null,
  originalWidth = null,
  originalLength = null,
  newShape,
  newDiameter = null,
  newWidth = null,
  newLength = null
) {
  // Round
  let originalArea, newArea;

  switch (originalShape) {
    case "round":
      originalArea = calcCircleArea(originalDiameter);
      break;
    case "rect":
      originalArea = calcRectArea(originalWidth, originalLength);
      break;
    default:
      originalArea = 1;
      break;
  }

  switch (newShape) {
    case "round":
      newArea = calcCircleArea(newDiameter);
      break;
    case "rect":
      newArea = calcRectArea(newWidth, newLength);
      break;
    default:
      newArea = 1;
      break;
  }

  return newArea / originalArea;
}

function calcRectArea(width, length) {
  return width * length;
}

function calcCircleArea(diameter) {
  return Math.PI * (diameter / 2) ** 2;
}
