import styled, { css } from "styled-components";
import IngredientPreview from "./IngredientPreview";
import Link from "next/link";
import Image from "next/image";
import ModalBox from "../ModalBox/ModalBox";

export default function RecipePreview({ recipe }) {
  return (
    <CardItem>
      <StyledLink href={`/recipe/${recipe._id}`}>
        <RecipeCard>
          <ImageWrapper>
            <StyledImage
              $imageAvailable={!!!recipe.image}
              src={recipe.image || "/assets/no-image.png"}
              alt={`Picture of a ${recipe.title}`}
            />
          </ImageWrapper>
          <TextWrapper>
            <CardTitle>{recipe.title}</CardTitle>
            <IngredientPreview ingredients={recipe.ingredients} />
          </TextWrapper>
        </RecipeCard>
      </StyledLink>

      <ActionDiv>
        <StyledActionLink href={`/form/edit-${recipe._id}`}>
          <Image
            src="/assets/pencil.png"
            width={25}
            height={25}
            alt="Edit Pencil"
          ></Image>
        </StyledActionLink>
        <ModalBox type="delete" recipeId={recipe._id} />
      </ActionDiv>
    </CardItem>
  );
}

const CardItem = styled.li`
  position: relative;
  list-style: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
const RecipeCard = styled.div`
  background: #ffffff;
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
  background: #ede5da;
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
  ${({ $imageAvailible }) =>
    $imageAvailible &&
    css`
      opacity: 30%;
    `}
`;

const TextWrapper = styled.div`
  padding: 12px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 641px) {
    padding: 16px 20px 20px;
  }
`;

const CardTitle = styled.p`
  font-family: var(--font-heading), serif;
  font-size: 17px;
  margin: 0 0 4px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 20px;
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

const StyledActionLink = styled(Link)`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e8ddd2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    box-shadow: 0 2px 8px rgba(60, 40, 20, 0.12);
  }
`;
