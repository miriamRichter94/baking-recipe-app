import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { getAllRecipes } from "@/services/recipeServices";
import { calculateShoppingList } from "@/lib/helper";
import Link from "next/link";
import RecipeShoppingList from "@/components/RecipeShoppingList/RecipeShoppingList";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";

export default function ShoppingList({ recipesToShop, recalculatedRecipes }) {
  const [checked, setChecked] = useState([]);

  const swrKey =
    recipesToShop.length > 0
      ? `/api/recipes?ids=${recipesToShop.join(",")}`
      : null;

  const { data: recipes, isLoading, error } = useSWR(swrKey, getAllRecipes);
  const { status } = useSession();

  if (status === "loading") return <h1>Loading...</h1>;
  if (status !== "authenticated") return <AccessDenied />;
  if (recipesToShop.length === 0) return <EmptyState />;
  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  const shoppingList = calculateShoppingList(recipes, recalculatedRecipes);
  const recipeNames = recipes.map((r) => r.title).join(", ");
  const collectedCount = checked.length;
  const recalculatedRecipesInList = recipes.filter(
    (recipe) => recalculatedRecipes[recipe._id]
  );

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
      {recalculatedRecipesInList.length > 0 && (
        <RecalculationHint>
          {recalculatedRecipesInList.map((recipe) => {
            const recalc = recalculatedRecipes[recipe._id];
            const panSize =
              recalc.shape === "round"
                ? `${recalc.diameter}cm round`
                : `${recalc.width}x${recalc.length}cm rectangular`;
            return (
              <HintItem key={recipe._id}>
                ⚠️ <strong>{recipe.title}</strong> is scaled for a {panSize} pan
              </HintItem>
            );
          })}
        </RecalculationHint>
      )}
      <RecipeShoppingList
        shoppingList={shoppingList}
        recipeNames={recipeNames}
        handleCheck={handleCheck}
        checked={checked}
      />
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
  background: var(--color-brand-light);
  color: var(--color-brand);
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
  color: var(--color-brand);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  font-family: var(--body-font);
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
  color: var(--color-text-muted);
  margin: 0;
`;

const RecalculationHint = styled.div`
  background: var(--color-surface-alt);
  border: 1px solid var(--color-brand-light);
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HintItem = styled.p`
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
`;
