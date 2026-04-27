import { useState } from "react";
import { useRouter } from "next/router";
import IngredientFields from "./IngredientFields";
import StepFields from "./StepsFields";
import useIsMobile from "@/lib/useIsMobile";
import NavBar from "@/styles/components/NavBar.styled";
import InputField from "@/styles/components/InputField.styled";
import Btn from "@/styles/components/Btn.styled";
import {
  createRecipeDataObject,
  setRecipeIngredientsForForm,
  uploadRecipeStepImages,
} from "@/lib/helper";
import { addRecipe, editRecipe } from "@/services/recipeServices";
import { uploadImage } from "@/services/imageService";
import {
  PageWrapper,
  MobileHeader,
  MobileBackBtn,
  MobileSaveBtn,
  FormPageTitle,
  PhotoUploadMobile,
  PhotoIconBox,
  PhotoUploadLabel,
  PhotoUploadDesktop,
  SectionCard,
  SectionCardTitle,
  ShapeToggleRow,
  ShapeToggleBtn,
  IngredientItem,
  IngredientItemAmount,
  RemoveBtn,
  AddRowBtn,
  StepRow,
  StepBadge,
  StepTextBox,
  StyledFieldset,
  StyledLegend,
  AddDashedBtn,
} from "@/styles/components/FormPage.styled";

export default function RecipeForm({ ingredients, units, recipe }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isEdit = !!recipe;
  const pageTitle = isEdit ? "Edit Recipe" : "Add New Recipe";

  const [selectedShape, setSelectedShape] = useState(
    recipe?.bakingForm?.shape ?? "round"
  );
  const [recipeIngredients, setRecipeIngredients] = useState(
    setRecipeIngredientsForForm(recipe?.ingredients)
  );
  const [recipeSteps, setRecipeSteps] = useState(
    recipe?.steps ?? [{ order: 1, instruction: "", image: "" }]
  );

  function handleAddIngredient() {
    setRecipeIngredients([...recipeIngredients, { ingredient: "", amount: "", unit: "" }]);
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
    const recipeData = createRecipeDataObject(formData, recipeIngredients, updatedSteps, urlRecipePicture);

    if (!isEdit) {
      await addRecipe(recipeData);
      router.push("/");
    } else {
      await editRecipe(recipeData, recipe._id);
      router.push(`/recipe/${recipe._id}`);
    }
  }

  // ── Mobile layout ────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <PageWrapper>
        <MobileHeader>
          <MobileBackBtn type="button" onClick={() => router.back()}>← Back</MobileBackBtn>
          <MobileSaveBtn type="submit" form="recipe-form">
            {isEdit ? "Save" : "Add"}
          </MobileSaveBtn>
        </MobileHeader>

        <form id="recipe-form" onSubmit={handleSubmit} style={{ padding: "24px 20px" }}>
          <FormPageTitle>{pageTitle}</FormPageTitle>

          {/* Photo upload */}
          <label htmlFor="image">
            <PhotoUploadMobile>
              <PhotoIconBox>📷</PhotoIconBox>
              <PhotoUploadLabel>Add a photo</PhotoUploadLabel>
            </PhotoUploadMobile>
          </label>
          <input type="file" id="image" name="image" style={{ display: "none" }} />

          <InputField label="Recipe title" placeholder="What are we baking?" name="title" id="title" defaultValue={recipe?.title} />
          <InputField label="Description" placeholder="Tell us about this recipe..." rows={3} name="description" id="description" defaultValue={recipe?.description} />

          {/* Baking form card */}
          <SectionCard>
            <SectionCardTitle>Baking Form</SectionCardTitle>
            <ShapeToggleRow>
              {["round", "rect"].map((s) => (
                <ShapeToggleBtn
                  key={s}
                  type="button"
                  $active={selectedShape === s}
                  onClick={() => setSelectedShape(s)}
                >
                  {s === "rect" ? "Rectangular" : "Round"}
                </ShapeToggleBtn>
              ))}
            </ShapeToggleRow>
            <input type="hidden" name="shape" value={selectedShape} />
            {selectedShape === "round" ? (
              <InputField label="Diameter (cm)" type="number" placeholder="26" name="diameter" id="diameter" defaultValue={recipe?.bakingForm?.diameter} />
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <InputField label="Width (cm)" type="number" placeholder="30" name="width" id="width" defaultValue={recipe?.bakingForm?.width} />
                <InputField label="Height (cm)" type="number" placeholder="40" name="height" id="height" defaultValue={recipe?.bakingForm?.height} />
              </div>
            )}
          </SectionCard>

          {/* Ingredients card */}
          <SectionCard>
            <SectionCardTitle>Ingredients</SectionCardTitle>
            {recipeIngredients.map((ing, i) => (
              <IngredientItem key={i}>
                <span style={{ flex: 2 }}>
                  {ingredients.find((x) => x._id === ing.ingredient)?.name || "Ingredient"}
                </span>
                <IngredientItemAmount>
                  {ing.amount} {units.find((u) => u._id === ing.unit)?.name}
                </IngredientItemAmount>
                <RemoveBtn type="button" onClick={() => handleRemoveIngredient(i)}>×</RemoveBtn>
              </IngredientItem>
            ))}
            <AddRowBtn type="button" onClick={handleAddIngredient}>+ Add ingredient</AddRowBtn>
          </SectionCard>

          {/* Steps card */}
          <SectionCard>
            <SectionCardTitle>Baking Steps</SectionCardTitle>
            {recipeSteps.map((step, i) => (
              <StepRow key={step.order}>
                <StepBadge>{step.order}</StepBadge>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <StepTextBox>{step.instruction || "Step description..."}</StepTextBox>
                  <RemoveBtn type="button" onClick={() => handleRemoveStep(i)} style={{ marginTop: 6 }}>×</RemoveBtn>
                </div>
              </StepRow>
            ))}
            <AddRowBtn type="button" onClick={handleAddStep}>+ Add step</AddRowBtn>
          </SectionCard>
        </form>
      </PageWrapper>
    );
  }

  // ── Desktop layout ───────────────────────────────────────────────────────────
  return (
    <PageWrapper>
      <NavBar onBack={() => router.back()} />

      <form onSubmit={handleSubmit} style={{ padding: "36px 40px", maxWidth: 680, margin: "0 auto" }}>
        <FormPageTitle>{pageTitle}</FormPageTitle>

        <InputField label="Title" placeholder="e.g. Chocolate Lava Cake" name="title" id="title" defaultValue={recipe?.title} />
        <InputField label="Description" placeholder="A short description of your recipe..." rows={3} name="description" id="description" defaultValue={recipe?.description} />

        {/* Photo upload */}
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="image" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#8c7b6b" }}>
            Recipe Image
          </label>
          <label htmlFor="image">
            <PhotoUploadDesktop>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
              Drop image here or click to upload
            </PhotoUploadDesktop>
          </label>
          <input type="file" id="image" name="image" style={{ display: "none" }} />
        </div>

        {/* Baking form */}
        <StyledFieldset>
          <StyledLegend>Baking Form</StyledLegend>
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8c7b6b" }}>Shape</label>
              <select
                name="shape"
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e8ddd2", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-body), sans-serif", background: "#fff", color: "#3d2b1f" }}
              >
                <option value="round">Round</option>
                <option value="rect">Rectangular</option>
              </select>
            </div>
            {selectedShape === "round" ? (
              <div style={{ flex: 1 }}>
                <InputField label="Diameter (cm)" type="number" placeholder="26" name="diameter" id="diameter" defaultValue={recipe?.bakingForm?.diameter} />
              </div>
            ) : (
              <>
                <div style={{ flex: 1 }}><InputField label="Width (cm)" type="number" placeholder="30" name="width" id="width" defaultValue={recipe?.bakingForm?.width} /></div>
                <div style={{ flex: 1 }}><InputField label="Height (cm)" type="number" placeholder="40" name="height" id="height" defaultValue={recipe?.bakingForm?.height} /></div>
              </>
            )}
          </div>
        </StyledFieldset>

        {/* Ingredients */}
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
          <AddDashedBtn type="button" onClick={handleAddIngredient}>+ Add Ingredient</AddDashedBtn>
        </StyledFieldset>

        {/* Steps */}
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
          <AddDashedBtn type="button" onClick={handleAddStep}>+ Add Step</AddDashedBtn>
        </StyledFieldset>

        <Btn variant="pill" type="submit">Save Recipe</Btn>
      </form>
    </PageWrapper>
  );
}
