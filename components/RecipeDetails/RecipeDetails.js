import Link from "next/link";
import styled, { css } from "styled-components";
import ModalBox from "../ModalBox/ModalBox";
import { useRouter } from "next/router";
import { useState } from "react";
import TabSwitcher from "@/components/RecipeDetails/TabSwitcher";
import StyledButton from "@/components/Button/StyledButton";
import RecipeMetaData from "./RecipeMetaData";
import Image from "next/image";

export default function RecipeDetails({
  recipe,
  favoriteRecipes,
  onToggleFavoriteRecipe,
  recipesToShop,
  onToggleRecipesToShop,
  recalculatedRecipes,
  handleAddRecalculatedRecipe,
  handleRemoveRecalculatedRecipe,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Ingredients");
  const isRecipeRecalculated = !!recalculatedRecipes[recipe._id];

  return (
    <>
      {/* Top: image + title/description/actions side by side */}
      <RecipeTopDetails>
        <ImageWrapper>
          <img
            src={recipe.image?.url || "/assets/no-image.png"}
            alt={recipe.title}
          />

          <HeroBackBtn onClick={() => router.push("/")} aria-label="Back">
            ←
          </HeroBackBtn>
          <HeroEditBtn
            as={Link}
            href={`/form/edit-${recipe._id}`}
            aria-label="Edit"
          >
            <Image
              src="/assets/pencil.png"
              width={35}
              height={35}
              alt="Edit pencil"
            />
          </HeroEditBtn>
          <HeroDelete as="div">
            <ModalBox
              type="delete"
              styleType="transparent"
              recipeId={recipe._id}
            >
              <Image
                src="/assets/garbage.png"
                width={25}
                height={25}
                alt="Trash Can"
              ></Image>
            </ModalBox>
          </HeroDelete>
          <HeroFavorite onClick={() => onToggleFavoriteRecipe(recipe._id)}>
            {favoriteRecipes.includes(recipe._id) ? "♥️" : "🤍"}
          </HeroFavorite>
          <HeroShoppingList onClick={() => onToggleRecipesToShop(recipe._id)}>
            {recipesToShop.includes(recipe._id) ? (
              <Image
                src="/assets/shopping-cart-added.png"
                width={30}
                height={30}
                alt="Shopping Card with plus symbol"
              />
            ) : (
              <Image
                src="/assets/shopping-cart-add.png"
                width={30}
                height={30}
                alt="Shopping Card with green tick"
              />
            )}
          </HeroShoppingList>
        </ImageWrapper>
        <DesktopMetaDataWrapper>
          <RecipeMetaData
            title={recipe.title}
            description={recipe.description}
            bakingForm={recipe.bakingForm}
            ingredientsLength={recipe.ingredients.length}
            stepLength={recipe.steps.length}
          />

          <DesktopActionRow>
            <StyledButton as={Link} href={`/form/edit-${recipe._id}`}>
              Edit Recipe
            </StyledButton>
            <StyledButton onClick={() => onToggleFavoriteRecipe(recipe._id)}>
              {favoriteRecipes.includes(recipe._id) ? "♥️" : "🤍"}
            </StyledButton>
            <StyledButton onClick={() => onToggleRecipesToShop(recipe._id)}>
              {recipesToShop.includes(recipe._id) ? (
                <Image
                  src="/assets/shopping-cart-added.png"
                  width={30}
                  height={30}
                  alt="Shopping Card with plus symbol"
                />
              ) : (
                <Image
                  src="/assets/shopping-cart-add.png"
                  width={30}
                  height={30}
                  alt="Shopping Card with green tick"
                />
              )}
            </StyledButton>
            <ModalBox type="delete" recipeId={recipe._id}>
              <Image
                src="/assets/garbage.png"
                width={25}
                height={25}
                alt="Trash Can"
              ></Image>
            </ModalBox>
          </DesktopActionRow>
        </DesktopMetaDataWrapper>
      </RecipeTopDetails>

      {/* Bottom: ingredients sidebar + steps */}
      <RecipeBottomDetails>
        <MobileMetaDataWrapper>
          <RecipeMetaData
            title={recipe.title}
            description={recipe.description}
            bakingForm={recipe.bakingForm}
            ingredientsLength={recipe.ingredients.length}
            stepLength={recipe.steps.length}
          />
        </MobileMetaDataWrapper>

        <TabSwitcher
          tabs={["Ingredients", "Steps"]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <IngredientsSidebar $activeTab={activeTab}>
          <SectionHeading>Ingredients</SectionHeading>
          {isRecipeRecalculated && (
            <p>
              Recipe is Recalculated as {recalculatedRecipes[recipe._id].shape}{" "}
              {recalculatedRecipes[recipe._id].shape === "round"
                ? recalculatedRecipes[recipe._id].diameter
                : `${recalculatedRecipes[recipe._id].width} x ${recalculatedRecipes[recipe._id].length}`}
            </p>
          )}
          {recipe.ingredients.map((ing, i) => (
            <IngredientRow
              key={ing._id}
              $last={i === recipe.ingredients.length - 1}
            >
              <span>{ing.ingredient.name}</span>
              <IngredientAmount>
                {isRecipeRecalculated
                  ? ing.amount * recalculatedRecipes[recipe._id].scalingFactor
                  : ing.amount}
                {" " + ing.unit.name}
              </IngredientAmount>
            </IngredientRow>
          ))}
          <ModalBox
            type="recalculate"
            recipeId={recipe._id}
            bakingform={recipe.bakingForm}
            onAddRecalculatedRecipe={handleAddRecalculatedRecipe}
          >
            Recalculate
          </ModalBox>
          <StyledButton
            onClick={() => handleRemoveRecalculatedRecipe(recipe._id)}
            style={{ marginLeft: "5px" }}
          >
            Reset Recipe
          </StyledButton>
        </IngredientsSidebar>

        <BakingStepWrapper $activeTab={activeTab}>
          <SectionHeading>Baking Steps</SectionHeading>
          {recipe.steps.map((step) => (
            <StepBlock key={step._id}>
              <StepItem>
                <StepBadge>{step.order}</StepBadge>
                <StepText>{step.instruction}</StepText>
              </StepItem>
              {step.image?.url && (
                <StepImageWrap>
                  <img src={step.image.url} alt={`Step ${step.order}`} />
                </StepImageWrap>
              )}
            </StepBlock>
          ))}
        </BakingStepWrapper>
      </RecipeBottomDetails>
    </>
  );
}

const RecipeTopDetails = styled.div`
  position: relative;

  @media (min-width: 641px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 260px;
  background: #ede5da;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 641px) {
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
  }
`;

const HeroIconBtn = styled.button`
  position: absolute;
  top: 14px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;

  @media (min-width: 641px) {
    display: none;
  }
`;

const HeroBackBtn = styled(HeroIconBtn)`
  left: 14px;
`;

const HeroEditBtn = styled(HeroIconBtn)`
  padding: 3px;
  right: 14px;
  font-size: 14px;
`;

const HeroDelete = styled(HeroIconBtn)`
  right: 14px;
  top: 60px;
  padding: 3px;
`;

const HeroFavorite = styled(HeroIconBtn)`
  right: 14px;
  top: 105px;
  padding: 3px;
  font-size: 24px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
`;

const HeroShoppingList = styled(HeroIconBtn)`
  right: 14px;
  top: 150px;
  padding: 3px;
`;

const DesktopMetaDataWrapper = styled.div`
  display: none;

  @media (min-width: 641px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const MobileMetaDataWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 641px) {
    display: none;
  }
`;

const RecipeBottomDetails = styled.div`
  padding: 20px 20px 32px;
  margin-top: -20px;
  background: var(--color-surface);
  border-radius: 20px 20px 0 0;
  position: relative;

  @media (min-width: 641px) {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 36px;
    margin-top: 40px;
  }
`;

const DesktopActionRow = styled.div`
  display: flex;
  gap: 12px;
`;

const SectionHeading = styled.h2`
  display: none;
  @media (min-width: 641px) {
    font-family: var(--heading-font);
    font-size: 22px;
    margin: 0 0 16px;
    font-weight: 400;
    display: block;
  }
`;

const IngredientsSidebar = styled.div`
  ${({ $activeTab }) =>
    $activeTab !== "Ingredients" &&
    css`
      display: none;
    `}
  @media (min-width: 641px) {
    background: var(--recipe-card-background);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
    align-self: start;
    display: block;
  }
`;

const BakingStepWrapper = styled.div`
  ${({ $activeTab }) =>
    $activeTab !== "Steps" &&
    css`
      display: none;
    `}

  @media (min-width: 641px) {
    display: block;
  }
`;

const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: ${({ $last }) => ($last ? "none" : "1px solid #e8ddd2")};
  font-size: 15px;
`;

const IngredientAmount = styled.span`
  color: var(--color-brand);
  font-weight: 600;
`;

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
  color: var(--color-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;

  @media (min-width: 641px) {
    width: 36px;
    height: 36px;
    background: var(--color-brand);
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
