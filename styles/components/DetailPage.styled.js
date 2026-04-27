import { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.styled";
import Btn from "./Btn.styled";
import TabSwitcher from "./TabSwitcher.styled";

// ─── Styled Components ───────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  background: #faf6f1;
  min-height: 100vh;
  font-family: 'Source Sans 3', sans-serif;
  color: #3d2b1f;
`;

// ── Mobile: hero image area ──

export const HeroWrapper = styled.div`
  position: relative;
`;

export const HeroImage = styled.div`
  width: 100%;
  height: 260px;
  background: #ede5da;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeroIconBtn = styled.button`
  position: absolute;
  top: 14px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
`;

export const HeroBackBtn = styled(HeroIconBtn)`
  left: 14px;
`;

export const HeroEditBtn = styled(HeroIconBtn)`
  right: 14px;
  font-size: 14px;
`;

// ── Mobile: content card pulled up over the hero ──

export const MobileContent = styled.div`
  padding: 20px 20px 32px;
  margin-top: -20px;
  background: #faf6f1;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

export const MetaTag = styled.span`
  padding: 5px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  background: #e8d5c4;
  color: #8b5e3c;
`;

export const DetailTitle = styled.h1`
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 36px;
    margin: 0 0 12px;
  }
`;

export const DetailDesc = styled.p`
  color: #8c7b6b;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 24px;

  @media (min-width: 641px) {
    font-size: 16px;
    margin: 0 0 20px;
  }
`;

// ── Shared: ingredient row ──

export const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: ${({ $last }) => ($last ? "none" : "1px solid #e8ddd2")};
  font-size: 15px;
`;

export const IngredientAmount = styled.span`
  color: #8b5e3c;
  font-weight: 600;
`;

// ── Shared: step item ──

export const StepItem = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 18px;

  @media (min-width: 641px) {
    gap: 16px;
    margin-bottom: 22px;
  }
`;

// Mobile badge: soft accent ring; Desktop badge: filled accent circle
export const StepBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e8d5c4;
  color: #8b5e3c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;

  @media (min-width: 641px) {
    width: 36px;
    height: 36px;
    background: #8b5e3c;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const StepText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  padding-top: 4px;

  @media (min-width: 641px) {
    padding-top: 6px;
  }
`;

// ── Desktop: two-column top grid ──

export const DesktopTopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
`;

export const DesktopHeroImage = styled.div`
  width: 100%;
  height: 340px;
  background: #ede5da;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DesktopMetaRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #c49a6c;
  margin-bottom: 24px;
`;

export const DesktopActionRow = styled.div`
  display: flex;
  gap: 12px;
`;

// ── Desktop: ingredients sidebar + steps grid ──

export const DesktopBottomGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 36px;
  margin-top: 40px;
`;

export const IngredientsSidebar = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  align-self: start;
`;

export const SectionHeading = styled.h2`
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  margin: 0 0 16px;
  font-weight: 400;
`;

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Renders mobile or desktop layout automatically based on viewport width.
//
// Props:
//   recipe   – full recipe object from your database
//   onBack   – () => void — go back to home
//   onEdit   – () => void — go to edit form
//   onDelete – () => void — open delete confirmation
//
// Usage (in pages/recipe/[id].js):
//   <DetailPage recipe={recipe} onBack={() => router.push("/")} onEdit={() => router.push(`/form/edit-${recipe._id}`)} onDelete={…} />

export default function DetailPage({ recipe, onBack, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("Ingredients");

  if (!recipe) return null;

  // ── Mobile ──
  const mobileLayout = (
    <PageWrapper>
      <HeroWrapper>
        <HeroImage>
          <img src={recipe.image || "/assets/no-image.png"} alt={recipe.title} />
        </HeroImage>
        <HeroBackBtn onClick={onBack} aria-label="Back">←</HeroBackBtn>
        <HeroEditBtn onClick={onEdit} aria-label="Edit">✏️</HeroEditBtn>
      </HeroWrapper>

      <MobileContent>
        <TagRow>
          {recipe.time && <MetaTag>⏱ {recipe.time}</MetaTag>}
          {recipe.servings && (
            <MetaTag>🍽 {recipe.servings} {recipe.servings === 1 ? "loaf" : "servings"}</MetaTag>
          )}
        </TagRow>

        <DetailTitle>{recipe.title}</DetailTitle>
        <DetailDesc>{recipe.description}</DetailDesc>

        <TabSwitcher
          tabs={["Ingredients", "Steps"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "Ingredients" && recipe.ingredients.map((ing, i) => (
          <IngredientRow key={ing._id || i} $last={i === recipe.ingredients.length - 1}>
            <span>{ing.ingredient?.name || ing.name}</span>
            <IngredientAmount>{ing.amount} {ing.unit?.name || ing.unit}</IngredientAmount>
          </IngredientRow>
        ))}

        {activeTab === "Steps" && recipe.steps.map((step, i) => (
          <StepItem key={step._id || i}>
            <StepBadge>{i + 1}</StepBadge>
            <StepText>{step.instruction || step}</StepText>
          </StepItem>
        ))}

        <div style={{ marginTop: 28 }}>
          <Btn variant="danger" full onClick={onDelete}>Delete Recipe</Btn>
        </div>
      </MobileContent>
    </PageWrapper>
  );

  // ── Desktop ──
  const desktopLayout = (
    <PageWrapper>
      <NavBar onBack={onBack} />

      <div style={{ padding: "36px 40px", maxWidth: 960, margin: "0 auto" }}>
        <DesktopTopGrid>
          <DesktopHeroImage>
            <img src={recipe.image || "/assets/no-image.png"} alt={recipe.title} />
          </DesktopHeroImage>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <DetailTitle>{recipe.title}</DetailTitle>
            <DetailDesc>{recipe.description}</DetailDesc>
            <DesktopMetaRow>
              {recipe.time && <span>⏱ {recipe.time}</span>}
              {recipe.servings && <span>🍽 {recipe.servings} {recipe.servings === 1 ? "loaf" : "servings"}</span>}
            </DesktopMetaRow>
            <DesktopActionRow>
              <Btn onClick={onEdit}>Edit Recipe</Btn>
              <Btn variant="danger" onClick={onDelete}>Delete</Btn>
            </DesktopActionRow>
          </div>
        </DesktopTopGrid>

        <DesktopBottomGrid>
          <IngredientsSidebar>
            <SectionHeading>Ingredients</SectionHeading>
            {recipe.ingredients.map((ing, i) => (
              <IngredientRow key={ing._id || i} $last={i === recipe.ingredients.length - 1}>
                <span>{ing.ingredient?.name || ing.name}</span>
                <IngredientAmount>{ing.amount} {ing.unit?.name || ing.unit}</IngredientAmount>
              </IngredientRow>
            ))}
          </IngredientsSidebar>

          <div>
            <SectionHeading>Baking Steps</SectionHeading>
            {recipe.steps.map((step, i) => (
              <StepItem key={step._id || i}>
                <StepBadge>{i + 1}</StepBadge>
                <StepText>{step.instruction || step}</StepText>
              </StepItem>
            ))}
          </div>
        </DesktopBottomGrid>
      </div>
    </PageWrapper>
  );

  // Swap layout at 641px — a CSS media query handles visibility
  return (
    <>
      <div className="mobile-only">{mobileLayout}</div>
      <div className="desktop-only">{desktopLayout}</div>
    </>
  );
}
