import Link from "next/link";
import { useState } from "react";
import styled, { css } from "styled-components";
import StyledButton from "@/components/Button/StyledButton";
import { TabTrack, Tab } from "@/components/RecipeDetails/TabSwitcher";

// ─── Category helpers ────────────────────────────────────────────────────────

const CATEGORIES = ["Pantry", "Dairy", "Produce", "Other"];

function categorize(name) {
  const n = name.toLowerCase();
  if (/milk|butter|cream|cheese|egg|yogurt|buttermilk/.test(n)) return "Dairy";
  if (/apple|berry|lemon|orange|banana|fruit|vegetable|carrot|potato|tomato/.test(n))
    return "Produce";
  if (
    /flour|sugar|salt|baking|yeast|oil|vanilla|honey|oat|cocoa|chocolate|cinnamon|spice|powder|extract/.test(
      n
    )
  )
    return "Pantry";
  return "Other";
}

function aggregateByCategory(shoppingList) {
  const map = {};
  shoppingList.forEach(({ recipeTitle, ingredients }) => {
    ingredients.forEach((ing) => {
      const key = ing.name.toLowerCase();
      if (map[key]) {
        map[key].amount += ing.amount;
        map[key].sources.push(recipeTitle);
      } else {
        map[key] = {
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          sources: [recipeTitle],
          category: categorize(ing.name),
        };
      }
    });
  });
  const items = Object.values(map);
  const byCategory = {};
  CATEGORIES.forEach((cat) => {
    byCategory[cat] = items.filter((i) => i.category === cat);
  });
  return byCategory;
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ShoppingList({
  shoppingList,
  checkedItems,
  onToggleChecked,
  onRemoveRecipe,
  onClearChecked,
}) {
  const [activeView, setActiveView] = useState("By Recipe");

  const totalItems = shoppingList.reduce(
    (acc, recipe) => acc + recipe.ingredients.length,
    0
  );
  const collectedCount = checkedItems.length;

  if (shoppingList.length === 0) {
    return (
      <EmptyState>
        <EmptyIllustration aria-hidden="true">🛒</EmptyIllustration>
        <EmptyHeading>Your shopping list is empty</EmptyHeading>
        <EmptyBody>Add ingredients from any recipe to get started</EmptyBody>
        <StyledButton variant="pill" as={Link} href="/">
          Browse Recipes
        </StyledButton>
      </EmptyState>
    );
  }

  return (
    <PageWrapper>
      {/* ── Header ── */}
      <StickyHeader>
        <HeaderRow>
          <HeaderTitle>Shopping List</HeaderTitle>
          <CounterPill>
            {collectedCount} of {totalItems} collected
          </CounterPill>
        </HeaderRow>
        <ActionRow>
          <StyledButton variant="ghost" onClick={onClearChecked}>
            Clear checked
          </StyledButton>
          <StyledButton
            variant="secondary"
            onClick={() => window.print()}
          >
            Share list
          </StyledButton>
        </ActionRow>
      </StickyHeader>

      {/* ── Tab switcher ── */}
      <ViewTabTrack>
        {["By Recipe", "By Category"].map((tab) => (
          <ViewTab
            key={tab}
            $active={activeView === tab}
            onClick={() => setActiveView(tab)}
          >
            {tab}
          </ViewTab>
        ))}
      </ViewTabTrack>

      {/* ── Content ── */}
      {activeView === "By Recipe" ? (
        <GroupGrid $count={shoppingList.length}>
          {shoppingList.map((group) => (
            <RecipeGroup
              key={group.recipeId}
              group={group}
              checkedItems={checkedItems}
              onToggleChecked={onToggleChecked}
              onRemove={onRemoveRecipe}
            />
          ))}
        </GroupGrid>
      ) : (
        <CategoryView
          shoppingList={shoppingList}
          checkedItems={checkedItems}
          onToggleChecked={onToggleChecked}
        />
      )}

      {/* ── Mobile FAB ── */}
      <PrintFAB onClick={() => window.print()} aria-label="Print shopping list">
        🖨
      </PrintFAB>
    </PageWrapper>
  );
}

// ─── Recipe group card ────────────────────────────────────────────────────────

function RecipeGroup({ group, checkedItems, onToggleChecked, onRemove }) {
  return (
    <GroupCard>
      <GroupHeader>
        <GroupTitle>{group.recipeTitle}</GroupTitle>
        <RemoveBtn onClick={() => onRemove(group.recipeId)} aria-label="Remove group">
          ×
        </RemoveBtn>
      </GroupHeader>
      <GroupDivider />
      {group.ingredients.map((ing, i) => {
        const key = `${group.recipeId}_${ing.id}`;
        const checked = checkedItems.includes(key);
        return (
          <IngRow
            key={key}
            $last={i === group.ingredients.length - 1}
            $checked={checked}
          >
            <Checkbox
              $checked={checked}
              onClick={() => onToggleChecked(key)}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && onToggleChecked(key)}
            >
              {checked && <CheckMark>✓</CheckMark>}
            </Checkbox>
            <IngName $checked={checked}>{ing.name}</IngName>
            <IngAmount $checked={checked}>
              {ing.amount} {ing.unit}
            </IngAmount>
          </IngRow>
        );
      })}
    </GroupCard>
  );
}

// ─── Category view ────────────────────────────────────────────────────────────

function CategoryView({ shoppingList, checkedItems, onToggleChecked }) {
  const byCategory = aggregateByCategory(shoppingList);

  return (
    <CategoryWrapper>
      {CATEGORIES.map((cat) => {
        const items = byCategory[cat];
        if (!items || items.length === 0) return null;
        return (
          <GroupCard key={cat}>
            <GroupHeader>
              <GroupTitle>{cat}</GroupTitle>
            </GroupHeader>
            <GroupDivider />
            {items.map((item, i) => {
              const key = `cat_${item.name.toLowerCase()}`;
              const checked = checkedItems.includes(key);
              return (
                <IngRow
                  key={key}
                  $last={i === items.length - 1}
                  $checked={checked}
                >
                  <Checkbox
                    $checked={checked}
                    onClick={() => onToggleChecked(key)}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === " " && onToggleChecked(key)}
                  >
                    {checked && <CheckMark>✓</CheckMark>}
                  </Checkbox>
                  <IngNameWrapper>
                    <IngName $checked={checked}>{item.name}</IngName>
                    {item.sources.length > 1 && (
                      <IngSource>from {item.sources.length} recipes</IngSource>
                    )}
                  </IngNameWrapper>
                  <IngAmount $checked={checked}>
                    {item.amount} {item.unit}
                  </IngAmount>
                </IngRow>
              );
            })}
          </GroupCard>
        );
      })}
    </CategoryWrapper>
  );
}

// ─── Styled components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 24px 20px 100px;
  max-width: 720px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 36px 32px 60px;
  }
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 57px;
  background: #faf6f1;
  z-index: 5;
  padding-bottom: 12px;
  margin-bottom: 4px;

  @media (min-width: 641px) {
    top: 65px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const HeaderTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  font-weight: 400;
  color: #3d2b1f;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 36px;
  }
`;

const CounterPill = styled.span`
  background: #f3ece4;
  color: #8b5e3c;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  white-space: nowrap;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Tab switcher visible on all breakpoints (override the mobile-only default)
const ViewTabTrack = styled(TabTrack)`
  @media (min-width: 641px) {
    display: flex;
    max-width: 280px;
  }
  margin-bottom: 20px;
`;

const ViewTab = styled(Tab)``;

const GroupGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 641px) {
    ${({ $count }) =>
      $count > 6 &&
      css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      `}
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GroupCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
  padding: 20px 22px;
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const GroupTitle = styled.h2`
  font-family: var(--heading-font);
  font-size: 18px;
  font-weight: 400;
  color: #3d2b1f;
  margin: 0;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #8c7b6b;
  cursor: pointer;
  line-height: 1;
  padding: 0 0 2px;

  &:hover {
    color: #3d2b1f;
  }
`;

const GroupDivider = styled.hr`
  border: none;
  border-top: 1px solid #e8ddd2;
  margin: 0 0 4px;
`;

const IngRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: ${({ $last }) => ($last ? "none" : "1px solid #e8ddd2")};
`;

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  ${({ $checked }) =>
    $checked
      ? css`
          background: #8b5e3c;
          border: 1.5px solid #8b5e3c;
        `
      : css`
          background: transparent;
          border: 1.5px solid #c49a6c;
        `}
`;

const CheckMark = styled.span`
  color: #fff;
  font-size: 13px;
  line-height: 1;
  margin-top: 1px;
`;

const IngNameWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const IngName = styled.span`
  font-size: 15px;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#3d2b1f")};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
  transition: all 0.15s;
  display: block;
`;

const IngSource = styled.span`
  font-size: 12px;
  color: #8c7b6b;
  display: block;
  margin-top: 2px;
`;

const IngAmount = styled.span`
  font-size: 15px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#8b5e3c")};
  white-space: nowrap;
  transition: color 0.15s;
  margin-left: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px 40px;
  max-width: 400px;
  margin: 0 auto;
`;

const EmptyIllustration = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const EmptyHeading = styled.h2`
  font-family: var(--heading-font);
  font-size: 24px;
  font-weight: 400;
  color: #3d2b1f;
  margin: 0 0 12px;
`;

const EmptyBody = styled.p`
  color: #8c7b6b;
  font-size: 15px;
  margin: 0 0 28px;
  line-height: 1.5;
`;

const PrintFAB = styled.button`
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
  font-size: 24px;
  box-shadow: 0 4px 16px rgba(139, 94, 60, 0.35);
  cursor: pointer;
  z-index: 20;

  @media (min-width: 641px) {
    display: none;
  }
`;
