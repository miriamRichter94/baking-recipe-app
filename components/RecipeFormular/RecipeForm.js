import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IngredientFields from "./IngredientFields";
import StepFields from "./StepsFields";
import InputField from "@/components/RecipeFormular/InputField";
import StyledButton from "@/components/Button/StyledButton";
import {
  createRecipeDataObject,
  setRecipeIngredientsForForm,
  uploadRecipeStepImages,
} from "@/lib/helper";
import { addRecipe, editRecipe } from "@/services/recipeServices";
import { uploadImage } from "@/services/imageService";
import styled from "styled-components";
import BakingFormFields from "./BakingFormFields";
import ModalBox from "../ModalBox/ModalBox";

export default function RecipeForm({ ingredients, units, recipe }) {
  const router = useRouter();
  const isEdit = !!recipe;

  const [recipeIngredients, setRecipeIngredients] = useState(
    setRecipeIngredientsForForm(recipe?.ingredients)
  );
  const [recipeSteps, setRecipeSteps] = useState(
    recipe?.steps ?? [{ order: 1, instruction: "", image: "" }]
  );

  const [recipeMainImage, setRecipeMainImage] = useState(
    recipe?.image?.url ?? null
  );

  //This watches for when recipe "arrives" and populates the state then.
  useEffect(() => {
    if (recipe) {
      setRecipeIngredients(setRecipeIngredientsForForm(recipe.ingredients));
      setRecipeSteps(
        recipe.steps ?? [{ order: 1, instruction: "", image: "" }]
      );
      setRecipeMainImage(recipe.image?.url ?? null);
    }
  }, [recipe]);

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

  function handleRemoveIngredient(index) {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  }

  function handleAddStep() {
    const nextOrder = recipeSteps.at(-1).order + 1;
    setRecipeSteps([...recipeSteps, { order: nextOrder, instruction: "" }]);
  }

  function handleStepChange(index, field, value) {
    const updated = [...recipeSteps];
    updated[index][field] = value;
    setRecipeSteps(updated);
  }

  function handleRemoveStep(index) {
    setRecipeSteps(recipeSteps.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let imageData = {};
    const formDataObject = new FormData(event.target);
    const formData = Object.fromEntries(formDataObject);

    if (formData.image && formData.image.size > 0) {
      imageData = await uploadImage(formData.image);
    } else {
      imageData = recipe?.image ?? {};
    }

    const updatedSteps = await uploadRecipeStepImages(recipeSteps);
    const recipeData = createRecipeDataObject(
      formData,
      recipeIngredients,
      updatedSteps,
      imageData
    );

    if (!isEdit) {
      await addRecipe(recipeData);
      router.push("/");
    } else {
      await editRecipe(recipeData, recipe._id);
      router.replace(`/recipe/${recipe._id}`);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputField
        label="Recipe title"
        placeholder="What are we baking?"
        name="title"
        id="title"
        defaultValue={recipe?.title}
        required={true}
      />
      <InputField
        label="Description"
        placeholder="Tell us about this recipe..."
        rows={3}
        name="description"
        id="description"
        defaultValue={recipe?.description}
        required={true}
      />

      {/* Photo upload */}

      <label
        htmlFor="image"
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--color-text-muted)",
        }}
      >
        Recipe Image
      </label>
      {recipeMainImage ? (
        <>
          <ImagePreview>
            <img src={recipeMainImage} alt="Recipe Image" />
          </ImagePreview>
          {recipe?.image?.publicId && recipeMainImage === recipe.image.url ? (
            <ModalBox
              type="imageRemove"
              styleType="imageRemove"
              onConfirm={() => setRecipeMainImage(null)}
            >
              Remove image
            </ModalBox>
          ) : (
            <RemoveImagePreviewBtn
              type="button"
              onClick={() => setRecipeMainImage(null)}
            >
              Remove image
            </RemoveImagePreviewBtn>
          )}
        </>
      ) : (
        <>
          <label htmlFor="image">
            <PhotoUploadMobile>
              <PhotoIconBox>📷</PhotoIconBox>
              <PhotoUploadLabel>Add a photo</PhotoUploadLabel>
            </PhotoUploadMobile>
          </label>
        </>
      )}
      <input
        type="file"
        id="image"
        name="image"
        style={{ display: "none" }}
        onChange={(event) =>
          setRecipeMainImage(URL.createObjectURL(event.target.files[0]))
        }
      />

      {/* Baking form */}
      <StyledFieldset>
        <StyledLegend>Baking Form</StyledLegend>

        <BakingFormFields
          shape={recipe?.bakingForm?.shape}
          diameter={recipe?.bakingForm?.diameter}
          width={recipe?.bakingForm?.width}
          length={recipe?.bakingForm?.length}
        />
      </StyledFieldset>

      {/* Ingredients card */}
      <StyledFieldset>
        <StyledLegend>Ingredients</StyledLegend>
        {recipeIngredients.map((ing, i) => (
          <IngredientFields
            key={i}
            ingredients={ingredients}
            units={units}
            recipeIngredient={ing}
            onChange={(field, value) => handleIngredientChange(i, field, value)}
            onRemove={() => handleRemoveIngredient(i)}
          />
        ))}
        <AddRowBtn type="button" onClick={handleAddIngredient}>
          + Add ingredient
        </AddRowBtn>
      </StyledFieldset>

      {/* Steps card */}
      <StyledFieldset>
        <StyledLegend>Baking Steps</StyledLegend>
        {recipeSteps.map((step, i) => (
          <StepFields
            key={step.order}
            recipeStep={step}
            onChange={(field, value) => handleStepChange(i, field, value)}
            onRemove={() => handleRemoveStep(i)}
          />
        ))}
        <AddRowBtn type="button" onClick={handleAddStep}>
          + Add Step
        </AddRowBtn>
      </StyledFieldset>
      <StyledButton variant="pill" type="submit">
        Save Recipe
      </StyledButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  padding: 24px 20px;

  @media (min-width: 641px) {
    padding: 36px 40px;
    max-width: 680px;
    margin: 0 auto;
  }
`;

const PhotoUploadMobile = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  padding: 36px;
  text-align: center;
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PhotoIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const PhotoUploadLabel = styled.span`
  font-size: 13px;
  color: var(--color-brand);
  font-weight: 500;
`;

// Wrapper that indents under the step text, with image preview
const ImagePreview = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;

    @media (min-width: 641px) {
      height: 120px;
    }
  }
`;

// "Remove image" danger text link
const RemoveImagePreviewBtn = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: var(--color-danger);
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  margin-bottom: 15px;
  display: inline-block;
`;

const StyledFieldset = styled.fieldset`
  min-width: 0;
  background: var(--color-surface-alt);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid var(--color-border);

  @media (min-width: 641px) {
    padding: 22px;
    margin-bottom: 28px;
  }
`;

const StyledLegend = styled.legend`
  font-family: var(--heading-font);
  font-size: 18px;
  padding: 0 8px;
  font-weight: 400;
`;

export const AddRowBtn = styled.button`
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: 1.5px dashed var(--color-border-alt);
  background: transparent;
  color: var(--color-brand);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  @media (min-width: 641px) {
    width: auto;
    background: none;
    border: 1px dashed var(--color-border-alt);
    border-radius: 8px;
    padding: 10px 16px;
    color: var(--color-brand);
    font-size: 14px;
    cursor: pointer;
  }
`;
