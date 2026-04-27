import styled from "styled-components";
import RecipePreview from "./RecipePreview";
import NavBar from "@/styles/components/NavBar.styled";
import Btn from "@/styles/components/Btn.styled";

export default function RecipeList({ recipes }) {
  return (
    <PageWrapper>
      <NavBar />

      <PageContent>
        <PageHeader>
          <PageTitle>Your Baking Recipes</PageTitle>
          <PageSubtitle>Simple recipes, made with love</PageSubtitle>
        </PageHeader>

        {/* Add button (desktop) */}
        <div
          className="desktop-add-btn"
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <Btn variant="pill" onClick={() => router.push("/form/create")}>
            + Add New Recipe
          </Btn>
        </div>

        <ListGrid>
          {recipes.map((recipe) => (
            <RecipePreview key={recipe._id} recipe={recipe} />
          ))}
        </ListGrid>
      </PageContent>

      {/* Mobile FAB */}
      <FAB
        onClick={() => router.push("/form/create")}
        aria-label="Add new recipe"
      >
        +
      </FAB>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background: #faf6f1;
  min-height: 100vh;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
`;

export const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 40px 32px;
  }
`;

export const PageHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;

  @media (min-width: 641px) {
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const PageTitle = styled.h1`
  font-family: var(--font-heading), serif;
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;
  color: #3d2b1f;
  white-space: pre-line;

  @media (min-width: 641px) {
    font-size: 42px;
  }
`;

export const PageSubtitle = styled.p`
  color: #8c7b6b;
  font-size: 15px;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 17px;
  }
`;

const ListGrid = styled.ul`
  list-style: "none";
  padding: 0;
  margin: 0;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 20px rgba(60, 40, 20, 0.13);
    transform: translateY(-2px);
  }

  @media (min-width: 641px) {
    flex-direction: column;
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
