import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { getRecipesByIds } from "@/services/recipeServices";
import { calculateShoppingList } from "@/lib/helper";
import Link from "next/link";

export default function ShoppingList({ recipesToShop, onToggleRecipesToShop }) {
  const [checked, setChecked] = useState([]);

  const swrKey =
    recipesToShop.length > 0
      ? `/api/recipes?ids=${recipesToShop.join(",")}`
      : null;

  const { data: recipes, isLoading, error } = useSWR(swrKey, getRecipesByIds);

  if (recipesToShop.length === 0) return <EmptyState />;
  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  const shoppingList = calculateShoppingList(recipes);
  const recipeNames = recipes.map((r) => r.title).join(", ");
  const collectedCount = checked.length;

  function handleCheck(key) {
    setChecked((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function handleClearChecked() {
    setChecked([]);
  }

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Shopping List</PageTitle>
        <CounterPill>
          {collectedCount} of {shoppingList.length} collected
        </CounterPill>
      </PageHeader>

      <MetaRow>
        <GhostBtn onClick={handleClearChecked}>Clear checked</GhostBtn>
      </MetaRow>

      <RecipeGroup>
        <ForLabel>For: {recipeNames}</ForLabel>
        <Divider />

        {shoppingList.map((item) => {
          const key = `${item.name}-${item.unit}`;
          const isChecked = checked.includes(key);
          return (
            <IngredientRow key={key}>
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheck(key)}
              />
              <IngredientName $checked={isChecked}>{item.name}</IngredientName>
              <IngredientAmount $checked={isChecked}>
                {item.amount} {item.unit}
              </IngredientAmount>
            </IngredientRow>
          );
        })}
      </RecipeGroup>
    </PageContent>
  );
}

function EmptyState() {
  return (
    <EmptyWrapper>
      <EmptyTitle>Your shopping list is empty</EmptyTitle>
      <EmptyText>Add ingredients from any recipe to get started</EmptyText>
      <Link href="/">Browse recipes</Link>
    </EmptyWrapper>
  );
}

// ─── Styled Components ───────────────────────────────────────────────────────

const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 36px 32px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PageTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  font-weight: 400;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 36px;
  }
`;

const CounterPill = styled.span`
  background: #e8d5c4;
  color: #8b5e3c;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 40px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const GhostBtn = styled.button`
  background: none;
  border: none;
  color: #8b5e3c;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  font-family: var(--body-font);
`;

const RecipeGroup = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
`;

const ForLabel = styled.p`
  color: #8c7b6b;
  margin: 0 0 14px;
  font-style: italic;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e8ddd2;
  margin: 0 0 14px;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #e8ddd2;

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid #c49a6c;
  cursor: pointer;
  accent-color: #8b5e3c;
  flex-shrink: 0;
`;

const IngredientName = styled.span`
  flex: 1;
  font-size: 15px;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#3d2b1f")};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
`;

const IngredientAmount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#8b5e3c")};
`;

const EmptyWrapper = styled.div`
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const EmptyTitle = styled.h2`
  font-family: var(--heading-font);
  font-size: 24px;
  font-weight: 400;
  margin: 0;
`;

const EmptyText = styled.p`
  color: #8c7b6b;
  margin: 0;
`;
