export function createRecipeDataObject(
  formData,
  ingredientsList,
  recipeStepsList
) {
  let steps = [];
  recipeStepsList.map(
    (recipeStep) =>
      (steps = [
        ...steps,
        {
          order: recipeStep.stepNumber,
          instruction: recipeStep.description,
          image: "",
        },
      ])
  );

  return {
    title: formData.title,
    description: formData.description,
    image: "",
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
