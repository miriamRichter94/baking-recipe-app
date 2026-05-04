import { useState } from "react";
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

export default function RecipeForm({ ingredients, units, recipe }) {
  const router = useRouter();
  const isEdit = !!recipe;

  const [selectedShape, setSelectedShape] = useState(
    recipe?.bakingForm?.shape ?? "round"
  );
  const [recipeIngredients, setRecipeIngredients] = useState(
    setRecipeIngredientsForForm(recipe?.ingredients)
  );
  const [recipeSteps, setRecipeSteps] = useState(
    recipe?.steps ?? [{ order: 1, instruction: "", image: "" }]
  );

  const [recipeMainImage, setRecipeMainImage] = useState(recipe?.image ?? null);

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
    let urlRecipePicture;
    const formDataObject = new FormData(event.target);
    const formData = Object.fromEntries(formDataObject);

    if (formData.image && formData.image.size > 0) {
      ({ url: urlRecipePicture } = await uploadImage(formData.image));
    } else {
      urlRecipePicture = recipe?.image ?? "";
    }

    const updatedSteps = await uploadRecipeStepImages(recipeSteps);
    const recipeData = createRecipeDataObject(
      formData,
      recipeIngredients,
      updatedSteps,
      urlRecipePicture
    );

    if (!isEdit) {
      await addRecipe(recipeData);
      router.push("/");
    } else {
      await editRecipe(recipeData, recipe._id);
      router.push(`/recipe/${recipe._id}`);
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
          color: "#8c7b6b",
        }}
      >
        Recipe Image
      </label>
      {recipeMainImage ? (
        <>
          <ImagePreview>
            <img src={recipeMainImage} alt="Recipe Image" />
          </ImagePreview>
          <RemoveImagePreviewBtn
            type="button"
            onClick={() => setRecipeMainImage(null)}
          >
            Remove image
          </RemoveImagePreviewBtn>
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
          width={recipe?.bakingForm?.widht}
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
  border: 2px dashed #e8ddd2;
  border-radius: 12px;
  padding: 36px;
  text-align: center;
  background: #ffffff;
  color: #8c7b6b;
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
  color: #8b5e3c;
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
  color: #b5473a;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  margin-bottom: 15px;
  display: inline-block;
`;

const StyledFieldset = styled.fieldset`
  min-width: 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #e8ddd2;

  @media (min-width: 641px) {
    border: 1px solid #e8ddd2;
    border-radius: 12px;
    padding: 22px;
    margin-bottom: 28px;
    background: #ffffff;
  }
`;

const StyledLegend = styled.legend`
  font-family: var(--heading-font);
  font-size: 18px;
  padding: 0 8px;
  font-weight: 400;
`;

const ShapeToggleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

const ShapeToggleBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;

  background: ${({ $active }) => ($active ? "#8b5e3c" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#8c7b6b")};
  border: ${({ $active }) => ($active ? "none" : "1px solid #e8ddd2")};
`;

export const AddRowBtn = styled.button`
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: 1.5px dashed #e8d5c4;
  background: transparent;
  color: #8b5e3c;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  @media (min-width: 641px) {
    width: auto;
    background: none;
    border: 1px dashed #c49a6c;
    border-radius: 8px;
    padding: 10px 16px;
    color: #8b5e3c;
    font-size: 14px;
    cursor: pointer;
  }
`;
