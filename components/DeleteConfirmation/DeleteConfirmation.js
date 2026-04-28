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
  font-family: var(--font-heading), serif;
  font-size: 22px;
  color: #3d2b1f;
  margin: 0;
  font-weight: 400;
`;

const ConfirmText = styled.p`
  font-family: var(--font-body), sans-serif;
  font-size: 15px;
  color: #8c7b6b;
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
  background: #b5473a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
  width: 100%;
`;

const CancelBtn = styled.button`
  background: none;
  border: 1px solid #e8ddd2;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #3d2b1f;
  font-family: var(--font-body), sans-serif;
  width: 100%;
`;
