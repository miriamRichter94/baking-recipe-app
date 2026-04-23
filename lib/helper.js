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
          image: "",
        },
      ])
  );

  return {
    title: formData.title,
    description: formData.description,
    image: url ?? "",
    bakingForm: {
      shape: formData.shape,
      diameter: formData.diameter ?? "",
      width: formData.width ?? "",
      height: formData.height ?? "",
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
          amount: recipeIngredient.amount,
          unit: recipeIngredient.unit._id,
        },
      ])
  );

  return formRecipeIngredients;
}
