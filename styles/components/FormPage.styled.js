import { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.styled";
import Btn from "./Btn.styled";
import InputField from "./InputField.styled";

// ─── Styled Components ───────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  background: #faf6f1;
  min-height: 100vh;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  padding-bottom: 40px;
`;

// ── Mobile: sticky header bar ──

export const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8ddd2;
  position: sticky;
  top: 0;
  background: #faf6f1;
  z-index: 10;
`;

export const MobileBackBtn = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  color: #3d2b1f;
  font-family: var(--font-body), sans-serif;
  padding: 0;
`;

export const MobileSaveBtn = styled.button`
  background: #8b5e3c;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 9px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
`;

export const FormPageTitle = styled.h1`
  font-family: var(--font-heading), serif;
  font-size: 26px;
  margin: 0 0 24px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 36px;
    margin: 0 0 32px;
  }
`;

// ── Photo upload ──

export const PhotoUploadMobile = styled.div`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  background: #e8d5c4;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
`;

export const PhotoIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const PhotoUploadLabel = styled.span`
  font-size: 13px;
  color: #8b5e3c;
  font-weight: 500;
`;

export const PhotoUploadDesktop = styled.div`
  border: 2px dashed #e8ddd2;
  border-radius: 12px;
  padding: 36px;
  text-align: center;
  background: #ffffff;
  color: #8c7b6b;
  font-size: 14px;
  margin-bottom: 28px;
  cursor: pointer;
`;

// ── Section card (mobile) ──

export const SectionCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #e8ddd2;
`;

export const SectionCardTitle = styled.h3`
  font-family: var(--font-heading), serif;
  font-size: 17px;
  margin: 0 0 14px;
  font-weight: 400;
`;

// ── Shape toggle (mobile) ──

export const ShapeToggleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

export const ShapeToggleBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;
  font-family: var(--font-body), sans-serif;

  background: ${({ $active }) => ($active ? "#8b5e3c" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#8c7b6b")};
  border: ${({ $active }) => ($active ? "none" : "1px solid #e8ddd2")};
`;

// ── Ingredient / Step rows ──

export const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #faf6f1;
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const IngredientItemAmount = styled.span`
  flex: 1;
  color: #8b5e3c;
  font-weight: 600;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #8c7b6b;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
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
  font-family: var(--font-body), sans-serif;
`;

export const StepRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const StepBadge = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e8d5c4;
  color: #8b5e3c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 4px;

  @media (min-width: 641px) {
    width: 30px;
    height: 30px;
    background: #8b5e3c;
    color: #fff;
    font-size: 13px;
    margin-top: 6px;
  }
`;

export const StepTextBox = styled.div`
  flex: 1;
  padding: 9px 12px;
  background: #faf6f1;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
`;

// ── Desktop: fieldset ──

export const StyledFieldset = styled.fieldset`
  border: 1px solid #e8ddd2;
  border-radius: 12px;
  padding: 22px;
  margin-bottom: 28px;
  background: #ffffff;
`;

export const StyledLegend = styled.legend`
  font-family: var(--font-heading), serif;
  font-size: 18px;
  padding: 0 8px;
  font-weight: 400;
`;

export const DesktopIngredientRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
`;

export const IngredientInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  outline: none;
  color: #3d2b1f;

  &:focus {
    border-color: #8b5e3c;
  }
`;

export const UnitSelect = styled.select`
  width: 70px;
  padding: 10px 8px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  background: #ffffff;
`;

export const AddDashedBtn = styled.button`
  background: none;
  border: 1px dashed #c49a6c;
  border-radius: 8px;
  padding: 10px 16px;
  color: #8b5e3c;
  font-size: 14px;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
`;

export const StepTextarea = styled.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  background: #fff;
  resize: vertical;
  outline: none;
  color: #3d2b1f;

  &:focus {
    border-color: #8b5e3c;
  }
`;

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Handles both Add and Edit modes.
// Mobile → card-section layout (D2 style)
// Desktop → spacious fieldset layout (D1 style)
//
// Props:
//   recipe    – existing recipe object (undefined = add mode)
//   onBack    – () => void
//   onSubmit  – (formData) => void — called with the assembled form data
//
// Usage:
//   <FormPage onBack={() => router.back()} onSubmit={handleSave} />
//   <FormPage recipe={recipe} onBack={…} onSubmit={handleSave} />

export default function FormPage({ recipe, onBack, onSubmit }) {
  const isEdit = !!recipe;
  const pageTitle = isEdit ? "Edit Recipe" : "Add New Recipe";
  const [shape, setShape] = useState(recipe?.bakingForm?.shape || "round");

  return (
    <>
      {/* ── Mobile layout ── */}
      <PageWrapper className="mobile-only">
        <MobileHeader>
          <MobileBackBtn onClick={onBack}>← Back</MobileBackBtn>
          <MobileSaveBtn type="submit" form="recipe-form">{isEdit ? "Save" : "Add"}</MobileSaveBtn>
        </MobileHeader>

        <div style={{ padding: "24px 20px" }}>
          <FormPageTitle>{pageTitle}</FormPageTitle>

          {/* Photo */}
          <PhotoUploadMobile>
            <PhotoIconBox>📷</PhotoIconBox>
            <PhotoUploadLabel>Add a photo</PhotoUploadLabel>
          </PhotoUploadMobile>

          <InputField label="Recipe title" placeholder="What are we baking?" name="title" defaultValue={recipe?.title} />
          <InputField label="Description" placeholder="Tell us about this recipe..." rows={3} name="description" defaultValue={recipe?.description} />

          {/* Baking form card */}
          <SectionCard>
            <SectionCardTitle>Baking Form</SectionCardTitle>
            <ShapeToggleRow>
              {["round", "rect"].map((s) => (
                <ShapeToggleBtn key={s} $active={shape === s} onClick={() => setShape(s)} type="button">
                  {s === "rect" ? "Rectangular" : "Round"}
                </ShapeToggleBtn>
              ))}
            </ShapeToggleRow>
            {shape === "round" ? (
              <InputField label="Diameter (cm)" type="number" placeholder="26" name="diameter" defaultValue={recipe?.bakingForm?.diameter} />
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <InputField label="Width (cm)" type="number" placeholder="30" name="width" defaultValue={recipe?.bakingForm?.width} />
                <InputField label="Height (cm)" type="number" placeholder="40" name="height" defaultValue={recipe?.bakingForm?.height} />
              </div>
            )}
          </SectionCard>

          {/* Ingredients card */}
          <SectionCard>
            <SectionCardTitle>Ingredients</SectionCardTitle>
            {recipe?.ingredients?.map((ing, i) => (
              <IngredientItem key={i}>
                <span style={{ flex: 2 }}>{ing.ingredient?.name || ing.name}</span>
                <IngredientItemAmount>{ing.amount} {ing.unit?.name || ing.unit}</IngredientItemAmount>
                <RemoveBtn type="button">×</RemoveBtn>
              </IngredientItem>
            ))}
            <AddRowBtn type="button">+ Add ingredient</AddRowBtn>
          </SectionCard>

          {/* Steps card */}
          <SectionCard>
            <SectionCardTitle>Baking Steps</SectionCardTitle>
            {recipe?.steps?.map((step, i) => (
              <StepRow key={i}>
                <StepBadge>{i + 1}</StepBadge>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <StepTextBox>{step.instruction || step}</StepTextBox>
                  <RemoveBtn type="button" style={{ marginTop: 6 }}>×</RemoveBtn>
                </div>
              </StepRow>
            ))}
            <AddRowBtn type="button">+ Add step</AddRowBtn>
          </SectionCard>
        </div>
      </PageWrapper>

      {/* ── Desktop layout ── */}
      <PageWrapper className="desktop-only">
        <NavBar onBack={onBack} />

        <div style={{ padding: "36px 40px", maxWidth: 680, margin: "0 auto" }}>
          <FormPageTitle>{pageTitle}</FormPageTitle>

          <InputField label="Title" placeholder="e.g. Chocolate Lava Cake" name="title" defaultValue={recipe?.title} />
          <InputField label="Description" placeholder="A short description of your recipe..." rows={3} name="description" defaultValue={recipe?.description} />

          {/* Photo upload */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#8c7b6b" }}>
              Recipe Image
            </label>
            <PhotoUploadDesktop>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
              Drop image here or click to upload
            </PhotoUploadDesktop>
          </div>

          {/* Baking form */}
          <StyledFieldset>
            <StyledLegend>Baking Form</StyledLegend>
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8c7b6b" }}>Shape</label>
                <UnitSelect value={shape} onChange={(e) => setShape(e.target.value)} name="shape">
                  <option value="round">Round</option>
                  <option value="rect">Rectangular</option>
                </UnitSelect>
              </div>
              {shape === "round" ? (
                <div style={{ flex: 1 }}>
                  <InputField label="Diameter (cm)" type="number" placeholder="26" name="diameter" defaultValue={recipe?.bakingForm?.diameter} />
                </div>
              ) : (
                <>
                  <div style={{ flex: 1 }}><InputField label="Width (cm)" type="number" placeholder="30" name="width" defaultValue={recipe?.bakingForm?.width} /></div>
                  <div style={{ flex: 1 }}><InputField label="Height (cm)" type="number" placeholder="40" name="height" defaultValue={recipe?.bakingForm?.height} /></div>
                </>
              )}
            </div>
          </StyledFieldset>

          {/* Ingredients */}
          <StyledFieldset>
            <StyledLegend>Ingredients</StyledLegend>
            {recipe?.ingredients?.map((ing, i) => (
              <DesktopIngredientRow key={i}>
                <IngredientInput style={{ flex: 2 }} defaultValue={ing.ingredient?.name || ing.name} placeholder="Ingredient" />
                <IngredientInput style={{ flex: 1, boxSizing: "border-box" }} defaultValue={ing.amount} placeholder="Amt" />
                <UnitSelect defaultValue={ing.unit?._id || ing.unit}>
                  <option>g</option>
                  <option>ml</option>
                  <option>pcs</option>
                  <option>batch</option>
                </UnitSelect>
                <RemoveBtn type="button" style={{ fontSize: 18 }}>×</RemoveBtn>
              </DesktopIngredientRow>
            ))}
            <AddDashedBtn type="button">+ Add Ingredient</AddDashedBtn>
          </StyledFieldset>

          {/* Steps */}
          <StyledFieldset>
            <StyledLegend>Baking Steps</StyledLegend>
            {recipe?.steps?.map((step, i) => (
              <DesktopIngredientRow key={i} style={{ alignItems: "flex-start" }}>
                <StepBadge style={{ marginTop: 6 }}>{i + 1}</StepBadge>
                <StepTextarea rows={2} defaultValue={step.instruction || step} placeholder="Describe this step..." />
                <RemoveBtn type="button" style={{ fontSize: 18, marginTop: 8 }}>×</RemoveBtn>
              </DesktopIngredientRow>
            ))}
            <AddDashedBtn type="button">+ Add Step</AddDashedBtn>
          </StyledFieldset>

          <Btn variant="pill" type="submit">Save Recipe</Btn>
        </div>
      </PageWrapper>
    </>
  );
}
