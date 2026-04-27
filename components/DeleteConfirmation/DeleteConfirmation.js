import { useRouter } from "next/router";
import { deleteRecipe } from "@/services/recipeServices";
import {
  ConfirmationWrapper,
  ConfirmTitle,
  ConfirmText,
  ConfirmActions,
  DeleteBtn,
  CancelBtn,
} from "@/styles/components/DeleteConfirmation.styled";

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
        Are you sure you want to delete this recipe? This action cannot be undone.
      </ConfirmText>
      <ConfirmActions>
        <DeleteBtn onClick={handleDelete}>Delete Recipe</DeleteBtn>
        <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
      </ConfirmActions>
    </ConfirmationWrapper>
  );
}
