import { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar.styled";
import Btn from "./Btn.styled";

// ─── Styled Components ───────────────────────────────────────────────────────

export const PageWrapper = styled.div`
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

export const SearchWrapper = styled.div`
  max-width: 100%;
  margin: 0 0 20px;

  @media (min-width: 641px) {
    max-width: 480px;
    margin: 0 auto 32px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid #e8ddd2;
  border-radius: 40px;
  font-size: 15px;
  font-family: var(--font-body), sans-serif;
  background: #ffffff;
  outline: none;
  box-sizing: border-box;
  color: #3d2b1f;

  &::placeholder {
    color: #8c7b6b;
  }

  @media (min-width: 641px) {
    padding: 14px 20px;
  }
`;

// Mobile-only horizontal pill row
export const CategoryRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 4px;

  /* hide scrollbar but keep scrollability */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryPill = styled.span`
  padding: 7px 16px;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;

  background: ${({ $active }) => ($active ? "#8b5e3c" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#8c7b6b")};
  border: ${({ $active }) => ($active ? "none" : "1px solid #e8ddd2")};
`;

export const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 641px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

// Card is horizontal on mobile, vertical block on desktop
export const RecipeCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 20px rgba(60, 40, 20, 0.13);
    transform: translateY(-2px);
  }

  @media (min-width: 641px) {
    flex-direction: column;
  }
`;

export const RecipeCardThumb = styled.div`
  width: 120px;
  height: 110px;
  flex-shrink: 0;
  background: #ede5da;
  border-radius: 12px 0 0 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 641px) {
    width: 100%;
    height: 180px;
    border-radius: 0;
  }
`;

export const RecipeCardBody = styled.div`
  padding: 12px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 641px) {
    padding: 16px 20px 20px;
  }
`;

export const RecipeCardTitle = styled.h3`
  font-family: var(--font-heading), serif;
  font-size: 17px;
  margin: 0 0 4px;
  font-weight: 400;

  @media (min-width: 641px) {
    font-size: 20px;
  }
`;

export const RecipeCardDesc = styled.p`
  font-size: 13px;
  color: #8c7b6b;
  margin: 0 0 12px;
  line-height: 1.5;
  display: none;

  @media (min-width: 641px) {
    display: block;
  }
`;

export const RecipeCardMeta = styled.div`
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #c49a6c;
  margin-top: 8px;

  @media (min-width: 641px) {
    margin-top: 0;
  }
`;

// Floating action button — mobile only
export const FAB = styled.button`
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

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Props:
//   recipes   – array of recipe objects from your database
//   onSelect  – (recipeId) => void — navigate to detail page
//   onAdd     – () => void — navigate to the add-recipe form
//
// Usage (in pages/index.js):
//   <HomePage recipes={recipes} onSelect={(id) => router.push(`/recipe/${id}`)} onAdd={() => router.push("/form/new")} />

const CATEGORIES = ["All", "Bread", "Cakes", "Pastry", "Cookies"];

export default function HomePage({ recipes = [], onSelect, onAdd }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <PageWrapper>
      <NavBar />

      <PageContent>
        {/* Header */}
        <PageHeader>
          <PageTitle>Your Baking Recipes</PageTitle>
          <PageSubtitle>Simple recipes, made with love</PageSubtitle>
        </PageHeader>

        {/* Search */}
        <SearchWrapper>
          <SearchInput type="text" placeholder="Search recipes..." />
        </SearchWrapper>

        {/* Category pills — mobile only */}
        <CategoryRow>
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryPill>
          ))}
        </CategoryRow>

        {/* Add button — desktop only */}
        <div style={{ textAlign: "center", marginBottom: 32, display: "none" }}
          className="desktop-add-btn">
          <Btn variant="pill" onClick={onAdd}>+ Add New Recipe</Btn>
        </div>

        {/* Recipe grid */}
        <RecipeGrid>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} onClick={() => onSelect(recipe._id)}>
              <RecipeCardThumb>
                <img
                  src={recipe.image || "/assets/no-image.png"}
                  alt={recipe.title}
                />
              </RecipeCardThumb>
              <RecipeCardBody>
                <RecipeCardTitle>{recipe.title}</RecipeCardTitle>
                <RecipeCardDesc>{recipe.description}</RecipeCardDesc>
                <RecipeCardMeta>
                  <span>⏱ {recipe.time}</span>
                  <span>🍽 {recipe.servings} {recipe.servings === 1 ? "loaf" : "servings"}</span>
                </RecipeCardMeta>
              </RecipeCardBody>
            </RecipeCard>
          ))}
        </RecipeGrid>
      </PageContent>

      {/* Mobile FAB */}
      <FAB onClick={onAdd} aria-label="Add new recipe">+</FAB>
    </PageWrapper>
  );
}
