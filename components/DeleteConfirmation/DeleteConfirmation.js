import styled from "styled-components";
import { useRouter } from "next/router";
import StyledButton from "@/components/Button/StyledButton";
import { deleteRecipe } from "@/services/recipeServices";

export default function DeleteConfirmation({ onCancel, recipeId }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteRecipe(recipeId);
    router.push("/");
  }

  return (
    <ConfirmationWrapper>
      <ConfirmTitle>Delete recipe?</ConfirmTitle>
      <ConfirmText>
        Are you sure you want to delete this recipe? This action cannot be
        undone.
      </ConfirmText>
      <ConfirmActions>
        <StyledButton variant="destructive" full onClick={handleDelete}>
          Delete Recipe
        </StyledButton>
        <StyledButton variant="secondary" full onClick={onCancel}>
          Cancel
        </StyledButton>
      </ConfirmActions>
    </ConfirmationWrapper>
  );
}

// --- Styled Components ---
const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ConfirmTitle = styled.h2`
  font-family: var(--heading-font);
  font-size: 22px;
  color: var(--color-text);
  margin: 0;
  font-weight: 400;
`;

const ConfirmText = styled.p`
  font-size: 15px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
`;

const ConfirmActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;
