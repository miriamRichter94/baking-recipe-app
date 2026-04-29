import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import StyledButton from "@/components/Button/StyledButton";
import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function HomePage() {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSWR("/api/recipes", getAllRecipes);
  const router = useRouter();

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <PageContent>
        <PageHeader>
          <PageTitle>Baking Recipes</PageTitle>
          <PageSubtitle>Simple recipes, made with love</PageSubtitle>
        </PageHeader>
        {/* Add button (desktop) */}
        <AddRecipeButtonWrapper>
          <StyledButton
            variant="pill"
            onClick={() => router.push("/form/create")}
          >
            + Add New Recipe
          </StyledButton>
        </AddRecipeButtonWrapper>
        <RecipeList recipes={recipes} />
      </PageContent>

      {/* Mobile FAB */}
      <FAB
        onClick={() => router.push("/form/create")}
        aria-label="Add new recipe"
      >
        +
      </FAB>
    </>
  );
}

const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 40px 32px;
  }
`;

const PageHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;

  @media (min-width: 641px) {
    text-align: center;
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;
  color: #3d2b1f;
  white-space: pre-line;

  @media (min-width: 641px) {
    font-size: 42px;
  }
`;

const PageSubtitle = styled.p`
  color: #8c7b6b;
  font-size: 15px;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 17px;
  }
`;

const AddRecipeButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;
  display: none;

  @media (min-width: 641px) {
    display: block;
  }
`;

const FAB = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #8b5e3c;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 300;
  box-shadow: 0 4px 16px rgba(139, 94, 60, 0.35);
  cursor: pointer;
  z-index: 20;

  @media (min-width: 641px) {
    display: none;
  }
`;
