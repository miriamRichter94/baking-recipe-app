import styled, { css } from "styled-components";
import IngredientPrview from "./IngredientPreview";
import Link from "next/link";
import Image from "next/image";
import ModalBox from "../ModalBox/ModalBox";

export default function RecipePreview({ recipe }) {
  return (
    <RecipeCard>
      <StyledLink href={`/recipe/${recipe._id}`}>
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
      </StyledLink>

      <ActionDiv $isDelete>
        <ModalBox type="delete" recipeId={recipe._id} />
      </ActionDiv>

      <ActionDiv $isEdit>
        <StyledActionLink href={`/form/edit-${recipe._id}`}>
          <Image
            src="/assets/pencil.png"
            width={25}
            height={25}
            alt="Edit Pencil"
          ></Image>
        </StyledActionLink>
      </ActionDiv>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--text-color);
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

const ActionDiv = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 20%;
  border: 1px solid black;
  background: white;
  bottom: 5px;

  &:hover {
    box-shadow: 2px 2px 2px grey;
  }

  ${({ $isDelete }) =>
    $isDelete &&
    css`
      right: 5px;
    `}

  ${({ $isEdit }) =>
    $isEdit &&
    css`
      right: 45px;
    `}
`;

const StyledActionLink = styled(Link)`
  background-color: transparent;
  border: none;
  align-self: center;
  padding: 0;
  cursor: pointer;
`;
