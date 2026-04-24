import styled from "styled-components";
import { useRouter } from "next/router";
import { deleteRecipe } from "@/services/recipeServices";

export default function DeleteConfirmation({ onCancel, recipeId }) {
  const router = useRouter();
  return (
    <ConfirmationDiv>
      <p>Are you sure you want to delete the Recipe?</p>
      <button
        onClick={async () => {
          await deleteRecipe(recipeId);
          router.push("/");
        }}
      >
        ❌Delete Recipe
      </button>
      <button onClick={onCancel}>Cancel</button>
    </ConfirmationDiv>
  );
}

// --- Styled Components ---
const ConfirmationDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
