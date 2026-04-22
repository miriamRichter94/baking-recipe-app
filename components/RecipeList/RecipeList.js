import styled from "styled-components";
import RecipePreview from "./RecipePreview";

export default function RecipeList({ recipes }) {
  return (
    <ListGrid>
      {recipes.map((recipe) => (
        <RecipePreview key={recipe._id} recipe={recipe} />
      ))}
    </ListGrid>
  );
}

const ListGrid = styled.ul`
  list-style: none;
  position: relative;
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: space-around;
  align-content: center;
  row-gap: 20px;
  column-gap: 32px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }
`;
