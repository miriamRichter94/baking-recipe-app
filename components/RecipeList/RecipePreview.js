import styled, { css } from "styled-components";
import IngredientPrview from "./IngredientPreview";

export default function RecipePreview({ recipe }) {
  return (
    <RecipeCard>
      <ImageWrapper>
        <StyledImage
          $imageAvailible={!!recipe.image}
          src={recipe.image || "/assets/no-image.png"}
          alt={`Picture of a ${recipe.title}`}
        />
      </ImageWrapper>
      <TextWrapper>
        <CakeTitle>{recipe.title}</CakeTitle>
        <IngredientPrview ingredients={recipe.ingredients} />
      </TextWrapper>
    </RecipeCard>
  );
}

const RecipeCard = styled.li`
  position: relative;
  border: 2px solid black;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 320px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ $imageAvailible }) =>
    !$imageAvailible &&
    css`
      opacity: 30%;
    `}
`;

const TextWrapper = styled.div`
  padding: 8px;
  overflow: hidden;
`;

const CakeTitle = styled.p`
  font-size: 1.3em;
  margin: 4px 0;
`;
