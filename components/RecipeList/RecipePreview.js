import Link from "next/link";
import IngredientPreview from "./IngredientPreview";
import ModalBox from "../ModalBox/ModalBox";
import styled from "styled-components";
import {
  RecipeCard,
  RecipeCardThumb,
  RecipeCardBody,
  RecipeCardTitle,
  RecipeCardDesc,
} from "@/styles/components/HomePage.styled";

export default function RecipePreview({ recipe }) {
  return (
    // li wrapper so RecipeList's <ul> stays valid HTML
    <CardItem>
      <CardLink href={`/recipe/${recipe._id}`}>
        <RecipeCard as="div">
          <RecipeCardThumb>
            <img
              src={recipe.image || "/assets/no-image.png"}
              alt={`Photo of ${recipe.title}`}
              style={{ opacity: recipe.image ? 1 : 0.3 }}
            />
          </RecipeCardThumb>

          <RecipeCardBody>
            <RecipeCardTitle>{recipe.title}</RecipeCardTitle>
            {recipe.description && (
              <RecipeCardDesc>{recipe.description}</RecipeCardDesc>
            )}
            <IngredientPreview ingredients={recipe.ingredients} />
          </RecipeCardBody>
        </RecipeCard>
      </CardLink>

      {/* Action buttons overlaid on bottom-right */}
      <ActionBar>
        <ActionLink href={`/form/edit-${recipe._id}`} aria-label="Edit recipe">
          ✏️
        </ActionLink>
        <ModalBox type="delete" recipeId={recipe._id} />
      </ActionBar>
    </CardItem>
  );
}

const CardItem = styled.li`
  position: relative;
  list-style: none;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ActionBar = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

const ActionLink = styled(Link)`
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
