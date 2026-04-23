import Link from "next/link";
import styled from "styled-components";
import ModalBox from "../ModalBox/ModalBox";

export default function RecipeDetails({ recipe }) {
  return (
    <DetailsWrapper>
      <Title>{recipe.title}</Title>
      <Description>{recipe.description}</Description>
      <StyledImage
        src={recipe.image || "/assets/no-image.png"}
        alt={`${recipe.title} Image`}
        width={180}
        height={280}
      />

      <IngredientWrapper>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((recipeIngredient) => (
            <li key={recipeIngredient._id}>
              {`${recipeIngredient.amount} ${recipeIngredient.unit.name} ${recipeIngredient.ingredient.name}`}{" "}
            </li>
          ))}
        </ul>
      </IngredientWrapper>

      <BakingStepsWrapper>
        <BakingStepsTitle>Baking - Steps</BakingStepsTitle>
        <ul>
          {recipe.steps.map((backingstep) => (
            <li key={backingstep._id}>
              {backingstep.order}: {backingstep.instruction}
            </li>
          ))}
        </ul>
      </BakingStepsWrapper>
      <Link href={`/form/edit-${recipe._id}`}>Edit Recipe</Link>
      <ModalBox type="delete" recipeId={recipe._id} />
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px;
`;

const Title = styled.h1`
  grid-column: 1 / -1;
  grid-row-start: 1;
  place-self: center;
`;

const Description = styled.p`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
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
