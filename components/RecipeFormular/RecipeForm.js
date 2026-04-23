import { useState } from "react";
import IngredientFields from "./IngredientFields";
import StepFields from "./StepsFields";
import {
  createRecipeDataObject,
  setRecipeIngredientsForForm,
} from "@/lib/helper";
import { addRecipe, editRecipe } from "@/services/recipeService";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function RecipeForm({ ingredients, units, recipe }) {
  const [selectedShape, setSelectedShape] = useState("round");
  const [recipeIngredients, setRecipeIngredients] = useState(
    setRecipeIngredientsForForm(recipe?.ingredients)
  );
  const [recipeSteps, setRecipeSteps] = useState(
    recipe?.steps ?? [{ order: 1, instruction: "" }]
  );

  const router = useRouter();

  function handleAddIngredient() {
    setRecipeIngredients([
      ...recipeIngredients,
      { ingredient: "", amount: "", unit: "" },
    ]);
  }

  function handleIngredientChange(index, field, value) {
    const updated = [...recipeIngredients];
    updated[index][field] = value;
    setRecipeIngredients(updated);
  }

  function handleAddStep() {
    const lastStepNumber = recipeSteps.at(-1).order;
    const newStepNumber = lastStepNumber + 1;
    setRecipeSteps([...recipeSteps, { order: newStepNumber, instruction: "" }]);
  }

  function hadnleStepChange(index, field, value) {
    const updated = [...recipeSteps];
    updated[index][field] = value;
    setRecipeSteps(updated);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    const form = event.target;
    const formDataObject = new FormData(form);
    const formData = Object.fromEntries(formDataObject);

    const recipeData = createRecipeDataObject(
      formData,
      recipeIngredients,
      recipeSteps
    );

    if (!recipe) {
      await addRecipe(recipeData);
      router.push("/");
    } else {
      await editRecipe(recipeData, recipe._id);
      router.push(`/recipe/${recipe._id}`);
    }
  }

  return (
    <StyledForm onSubmit={(event) => handleSubmitForm(event)}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={recipe?.title ?? ""}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows={5}
        maxLength={255}
        defaultValue={recipe?.description ?? ""}
      />

      <StyledFieldSets>
        <legend>Baking Form</legend>
        <label htmlFor="shape">Shape</label>
        <select
          id="shape"
          name="shape"
          defaultValue={recipe?.bakingForm.shape ?? ""}
          onChange={(event) => setSelectedShape(event.target.value)}
        >
          <option value="round">Round</option>
          <option value="rect">Rectangular</option>
        </select>
        {selectedShape === "round" && (
          <>
            <label htmlFor="diameter">Diameter</label>{" "}
            <input
              type="number"
              id="diameter"
              name="diameter"
              defaultValue={recipe?.bakingForm.diameter ?? ""}
            />
          </>
        )}

        {selectedShape === "rect" && (
          <>
            <label htmlFor="width">Width</label>
            <input
              type="number"
              id="widht"
              name="width"
              defaultValue={recipe?.bakingForm.width ?? ""}
            />
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              defaultValue={recipe?.bakingForm.height ?? ""}
            />
          </>
        )}
      </StyledFieldSets>

      <StyledFieldSets>
        <legend>Ingredients</legend>

        {recipeIngredients.map((recipeIngredient, index) => (
          <IngredientFields
            key={recipeIngredient.ingredient}
            ingredients={ingredients}
            units={units}
            recipeIngredient={recipeIngredient}
            onChange={(field, value) =>
              handleIngredientChange(index, field, value)
            }
          />
        ))}

        <button
          type="button"
          aria-label="Add Ingredient"
          onClick={() => handleAddIngredient()}
        >
          +
        </button>
      </StyledFieldSets>

      <StyledFieldSets>
        <legend>Baking Steps</legend>

        {recipeSteps.map((recipeStep, index) => (
          <StepFields
            key={recipeStep.order}
            recipeStep={recipeStep}
            onChange={(field, value) => hadnleStepChange(index, field, value)}
          />
        ))}

        <button
          type="button"
          aria-label="Add RecipeStep"
          onClick={() => handleAddStep()}
        >
          +
        </button>
      </StyledFieldSets>
      <button type="submit"> Save Recipe</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const StyledFieldSets = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
`;
