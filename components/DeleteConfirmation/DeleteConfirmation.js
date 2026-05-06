import styled from "styled-components";
import { useRouter } from "next/router";
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
        <DeleteBtn onClick={handleDelete}>Delete Recipe</DeleteBtn>
        <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
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

const DeleteBtn = styled.button`
  background: var(--color-danger);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;

const CancelBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  width: 100%;
`;
