import styled, { css } from "styled-components";
import IngredientPreview from "./IngredientPreview";
import Link from "next/link";
import Image from "next/image";
import ModalBox from "../ModalBox/ModalBox";

export default function RecipePreview({
  recipe,
  favoriteRecipes,
  onToggleFavoriteRecipe,
  recipesToShop,
  onToggleRecipesToShop,
}) {
  return (
    <RecipeCard>
      <StyledLink href={`/recipe/${recipe._id}`}>
        <RecipeInformation>
          <ImageWrapper>
            <StyledImage
              $imageavailable={!!!!recipe.image?.url}
              src={recipe.image.url || "/assets/no-image.png"}
              alt={`Picture of a ${recipe.title}`}
            />
          </ImageWrapper>
          <TextWrapper>
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
            <IngredientPreview ingredients={recipe.ingredients} />
          </TextWrapper>
        </RecipeInformation>
      </StyledLink>

      <ActionDiv>
        <StyledAction
          as="button"
          onClick={() => onToggleRecipesToShop(recipe._id)}
        >
          {recipesToShop.includes(recipe._id) ? (
            <Image
              src="/assets/shopping-cart-added.png"
              width={25}
              height={25}
              alt="Shopping Card with plus symbol"
            />
          ) : (
            <Image
              src="/assets/shopping-cart-add.png"
              width={25}
              height={25}
              alt="Shopping Card with green tick"
            />
          )}
        </StyledAction>
        <StyledAction
          as="button"
          onClick={() => onToggleFavoriteRecipe(recipe._id)}
        >
          {favoriteRecipes.includes(recipe._id) ? "♥️" : "🤍"}
        </StyledAction>
        <StyledAction
          href={`/form/edit-${recipe._id}`}
          aria-label="Edit Recipe"
        >
          <Image
            src="/assets/pencil.png"
            width={25}
            height={25}
            alt="Edit Pencil"
          ></Image>
        </StyledAction>
        <StyledAction as="div">
          <ModalBox
            type="delete"
            transparent={true}
            recipeId={recipe._id}
            aria-label="Delete Recipe"
          >
            <Image
              src="/assets/garbage.png"
              width={25}
              height={25}
              alt="Trash Can"
            ></Image>
          </ModalBox>
        </StyledAction>
      </ActionDiv>
    </RecipeCard>
  );
}

const RecipeCard = styled.li`
  position: relative;
  list-style: none;
  align-self: start;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
const RecipeInformation = styled.div`
  background: var(--recipe-card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 20px rgba(60, 40, 20, 0.13);
    transform: translateY(-2px);
  }

  @media (min-width: 641px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  width: 120px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 12px 0 0 12px;
  overflow: hidden;

  @media (min-width: 641px) {
    width: 100%;
    height: 180px;
    border-radius: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ $imageavailable }) =>
    !$imageavailable &&
    css`
      opacity: 30%;
    `}
`;

const TextWrapper = styled.div`
  padding: 12px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (min-width: 641px) {
    padding: 16px 20px 20px;
  }
`;

const CardTitle = styled.p`
  font-family: var(--heading-font);
  font-size: 17px;
  margin: 0 0 4px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 20px;
  }
`;

const CardDescription = styled.p`
  font-size: 14px;
  margin: 0 0 4px;
  font-weight: 400;
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`;

const ActionDiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

const StyledAction = styled(Link)`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    box-shadow: 0 2px 8px rgba(60, 40, 20, 0.12);
  }
`;
