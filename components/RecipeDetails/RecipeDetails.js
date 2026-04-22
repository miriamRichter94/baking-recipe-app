import styled from "styled-components";

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  return (
    <>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <StyledImage
        src={recipe.image || "/assets/no-image.png"}
        alt={`${recipe.title} Image`}
        width={180}
        height={280}
      />

      <div>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((recipeIngredient) => (
            <li key={recipeIngredient._id}>
              {`${recipeIngredient.amount} ${recipeIngredient.unit.name} ${recipeIngredient.ingredient.name}`}{" "}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Baking - Steps</h2>
        <ul>
          {recipe.steps.map((backingstep) => (
            <li key={backingstep._id}>
              {backingstep.order}: {backingstep.instruction}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const StyledImage = styled.img`
  width: 300px;
  height: 250px;
`;
