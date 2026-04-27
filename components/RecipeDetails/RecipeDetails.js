import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useIsMobile from "@/lib/useIsMobile";
import TabSwitcher from "@/styles/components/TabSwitcher.styled";
import NavBar from "@/styles/components/NavBar.styled";
import Btn from "@/styles/components/Btn.styled";
import ModalBox from "../ModalBox/ModalBox";
import {
  PageWrapper,
  HeroWrapper,
  HeroImage,
  HeroBackBtn,
  HeroEditBtn,
  MobileContent,
  TagRow,
  MetaTag,
  DetailTitle,
  DetailDesc,
  IngredientRow,
  IngredientAmount,
  StepBlock,
  StepItem,
  StepBadge,
  StepText,
  StepImageWrap,
  DesktopTopGrid,
  DesktopHeroImage,
  DesktopActionRow,
  DesktopBottomGrid,
  IngredientsSidebar,
  SectionHeading,
} from "@/styles/components/DetailPage.styled";

export default function RecipeDetails({ recipe }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Ingredients");

  // ── Mobile layout ────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <PageWrapper>
        <HeroWrapper>
          <HeroImage>
            <img src={recipe.image || "/assets/no-image.png"} alt={recipe.title} />
          </HeroImage>
          <HeroBackBtn onClick={() => router.push("/")} aria-label="Back">←</HeroBackBtn>
          <HeroEditBtn as={Link} href={`/form/edit-${recipe._id}`} aria-label="Edit">✏️</HeroEditBtn>
        </HeroWrapper>

        <MobileContent>
          {/* Meta tags — show step + ingredient counts since DB has no time/servings */}
          <TagRow>
            <MetaTag>🥣 {recipe.ingredients.length} ingredients</MetaTag>
            <MetaTag>📋 {recipe.steps.length} steps</MetaTag>
          </TagRow>

          <DetailTitle>{recipe.title}</DetailTitle>
          <DetailDesc>{recipe.description}</DetailDesc>

          {/* Tab switcher — Ingredients / Steps */}
          <TabSwitcher
            tabs={["Ingredients", "Steps"]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "Ingredients" && recipe.ingredients.map((ing, i) => (
            <IngredientRow key={ing._id} $last={i === recipe.ingredients.length - 1}>
              <span>{ing.ingredient.name}</span>
              <IngredientAmount>{ing.amount} {ing.unit.name}</IngredientAmount>
            </IngredientRow>
          ))}

          {activeTab === "Steps" && recipe.steps.map((step) => (
            <StepBlock key={step._id}>
              <StepItem>
                <StepBadge>{step.order}</StepBadge>
                <StepText>{step.instruction}</StepText>
              </StepItem>
              {step.image && (
                <StepImageWrap>
                  <img src={step.image} alt={`Step ${step.order}`} />
                </StepImageWrap>
              )}
            </StepBlock>
          ))}

          <div style={{ marginTop: 28 }}>
            <ModalBox type="delete" recipeId={recipe._id} />
          </div>
        </MobileContent>
      </PageWrapper>
    );
  }

  // ── Desktop layout ───────────────────────────────────────────────────────────
  return (
    <PageWrapper>
      <NavBar onBack={() => router.push("/")} />

      <div style={{ padding: "36px 40px", maxWidth: 960, margin: "0 auto" }}>
        {/* Top: image + title/description/actions side by side */}
        <DesktopTopGrid>
          <DesktopHeroImage>
            <img src={recipe.image || "/assets/no-image.png"} alt={recipe.title} />
          </DesktopHeroImage>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <DetailTitle>{recipe.title}</DetailTitle>
            <DetailDesc>{recipe.description}</DetailDesc>
            <DesktopActionRow>
              <Btn as={Link} href={`/form/edit-${recipe._id}`}>Edit Recipe</Btn>
              <ModalBox type="delete" recipeId={recipe._id} />
            </DesktopActionRow>
          </div>
        </DesktopTopGrid>

        {/* Bottom: ingredients sidebar + steps */}
        <DesktopBottomGrid>
          <IngredientsSidebar>
            <SectionHeading>Ingredients</SectionHeading>
            {recipe.ingredients.map((ing, i) => (
              <IngredientRow key={ing._id} $last={i === recipe.ingredients.length - 1}>
                <span>{ing.ingredient.name}</span>
                <IngredientAmount>{ing.amount} {ing.unit.name}</IngredientAmount>
              </IngredientRow>
            ))}
          </IngredientsSidebar>

          <div>
            <SectionHeading>Baking Steps</SectionHeading>
            {recipe.steps.map((step) => (
              <StepBlock key={step._id}>
                <StepItem>
                  <StepBadge>{step.order}</StepBadge>
                  <StepText>{step.instruction}</StepText>
                </StepItem>
                {step.image && (
                  <StepImageWrap>
                    <img src={step.image} alt={`Step ${step.order}`} />
                  </StepImageWrap>
                )}
              </StepBlock>
            ))}
          </div>
        </DesktopBottomGrid>
      </div>
    </PageWrapper>
  );
}
