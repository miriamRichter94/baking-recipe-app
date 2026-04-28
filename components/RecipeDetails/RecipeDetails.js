import Link from "next/link";
import styled from "styled-components";
import ModalBox from "../ModalBox/ModalBox";
import { useRouter } from "next/router";
import useIsMobile from "@/lib/useIsMobile";
import { useState } from "react";
import TabSwitcher from "@/styles/components/TabSwitcher.styled";
import Btn from "@/styles/components/Btn.styled";

export default function RecipeDetails({ recipe }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Ingredients");

  if (isMobile) {
    return (
      <>
        <HeroWrapper>
          <HeroImage>
            <img
              src={recipe.image || "/assets/no-image.png"}
              alt={recipe.title}
            />
          </HeroImage>
          <HeroBackBtn onClick={() => router.push("/")} aria-label="Back">
            ←
          </HeroBackBtn>
          <HeroEditBtn
            as={Link}
            href={`/form/edit-${recipe._id}`}
            aria-label="Edit"
          >
            ✏️
          </HeroEditBtn>
        </HeroWrapper>

        <MobileContent>
          {/* Meta tags — show step + ingredient counts since DB has no time/servings */}
          <TagRow>
            <MetaTag>🥣 {recipe.ingredients.length} ingredients</MetaTag>
            <MetaTag>📋 {recipe.steps.length} steps</MetaTag>
            <MetaTag>
              📐 {recipe.bakingForm.shape} ·
              {recipe.bakingForm.shape === "round"
                ? recipe.bakingForm.diameter
                : `${recipe.bakingForm.width} cm x ${recipe.bakingForm.length} cm`}
            </MetaTag>
          </TagRow>

          <Title>{recipe.title}</Title>
          <Description>{recipe.description}</Description>

          {/* Tab switcher — Ingredients / Steps */}
          <TabSwitcher
            tabs={["Ingredients", "Steps"]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "Ingredients" &&
            recipe.ingredients.map((ing, i) => (
              <IngredientRow
                key={ing._id}
                $last={i === recipe.ingredients.length - 1}
              >
                <span>{ing.ingredient.name}</span>
                <IngredientAmount>
                  {ing.amount} {ing.unit.name}
                </IngredientAmount>
              </IngredientRow>
            ))}

          {activeTab === "Steps" &&
            recipe.steps.map((step) => (
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
      </>
    );
  }

  return (
    <div style={{ padding: "36px 40px", maxWidth: 960, margin: "0 auto" }}>
      {/* Top: image + title/description/actions side by side */}
      <DesktopTopGrid>
        <DesktopHeroImage>
          <img
            src={recipe.image || "/assets/no-image.png"}
            alt={recipe.title}
          />
        </DesktopHeroImage>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title>{recipe.title}</Title>
          <Description>{recipe.description}</Description>

          <TagRow>
            <MetaTag>🥣 {recipe.ingredients.length} ingredients</MetaTag>
            <MetaTag>📋 {recipe.steps.length} steps</MetaTag>
            <MetaTag>
              📐 {recipe.bakingForm.shape} ·
              {recipe.bakingForm.shape === "round"
                ? recipe.bakingForm.diameter
                : `${recipe.bakingForm.width} cm x ${recipe.bakingForm.length} cm`}
            </MetaTag>
          </TagRow>
          <DesktopActionRow>
            <Btn as={Link} href={`/form/edit-${recipe._id}`}>
              Edit Recipe
            </Btn>
            <ModalBox type="delete" recipeId={recipe._id} />
          </DesktopActionRow>
        </div>
      </DesktopTopGrid>

      {/* Bottom: ingredients sidebar + steps */}
      <DesktopBottomGrid>
        <IngredientsSidebar>
          <SectionHeading>Ingredients</SectionHeading>
          {recipe.ingredients.map((ing, i) => (
            <IngredientRow
              key={ing._id}
              $last={i === recipe.ingredients.length - 1}
            >
              <span>{ing.ingredient.name}</span>
              <IngredientAmount>
                {ing.amount} {ing.unit.name}
              </IngredientAmount>
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
  );
}

const Title = styled.h1`
  font-family: var(--font-heading), serif;
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 36px;
    margin: 0 0 12px;
  }
`;

const Description = styled.p`
  color: #8c7b6b;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 24px;

  @media (min-width: 641px) {
    font-size: 16px;
    margin: 0 0 20px;
  }
`;

const StyledImage = styled.img`
  width: 300px;
  height: 250px;

  grid-row: 2 / 4;
  grid-column: 2 / -1;
  object-fit: contain;
`;

const IngredientWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
`;

const BakingStepsWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 4 / 5;
  display: flex;
  flex-direction: column;
`;

const BakingStepsTitle = styled.h2`
  align-self: center;
`;

// ── Mobile: hero image area ──

const HeroWrapper = styled.div`
  position: relative;
`;

const HeroImage = styled.div`
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

const HeroIconBtn = styled.button`
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

const HeroBackBtn = styled(HeroIconBtn)`
  left: 14px;
`;

const HeroEditBtn = styled(HeroIconBtn)`
  right: 14px;
  font-size: 14px;
`;

// ── Mobile: content card pulled up over the hero ──

const MobileContent = styled.div`
  padding: 20px 20px 32px;
  margin-top: -20px;
  background: #faf6f1;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const MetaTag = styled.span`
  padding: 5px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  background: #e8d5c4;
  color: #8b5e3c;
`;

// ── Shared: ingredient row ──

const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: ${({ $last }) => ($last ? "none" : "1px solid #e8ddd2")};
  font-size: 15px;
`;

const IngredientAmount = styled.span`
  color: #8b5e3c;
  font-weight: 600;
`;

// ── Shared: step item ──

const StepItem = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 18px;

  @media (min-width: 641px) {
    gap: 16px;
    margin-bottom: 22px;
  }
`;

// Mobile badge: soft accent ring; Desktop badge: filled accent circle
const StepBadge = styled.div`
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

const StepText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  padding-top: 4px;

  @media (min-width: 641px) {
    padding-top: 6px;
  }
`;

// Wrapper for an entire step (instruction row + optional image below)
const StepBlock = styled.div`
  margin-bottom: 20px;

  @media (min-width: 641px) {
    margin-bottom: 24px;
  }
`;

// Optional step image — indented to align under the text, not the badge
// Mobile indent: badge(32) + gap(14) = 46px
// Desktop indent: badge(36) + gap(16) = 52px
const StepImageWrap = styled.div`
  margin-top: 10px;
  margin-left: 46px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
  }

  @media (min-width: 641px) {
    margin-left: 52px;
    margin-top: 12px;

    img {
      height: 180px;
    }
  }
`;

// ── Desktop: two-column top grid ──

export const DesktopTopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
`;

const DesktopHeroImage = styled.div`
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

const DesktopMetaRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #c49a6c;
  margin-bottom: 24px;
`;

const DesktopActionRow = styled.div`
  display: flex;
  gap: 12px;
`;

// ── Desktop: ingredients sidebar + steps grid ──

const DesktopBottomGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 36px;
  margin-top: 40px;
`;

const IngredientsSidebar = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  align-self: start;
`;

const SectionHeading = styled.h2`
  font-family: var(--font-heading), serif;
  font-size: 22px;
  margin: 0 0 16px;
  font-weight: 400;
`;
