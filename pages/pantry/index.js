import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";
import PantryAddForm from "@/components/Pantry/PantryAddForm";
import PantryList from "@/components/Pantry/PantryList";
import { getAllIngredients } from "@/services/ingredientServices";
import { getAllUnits } from "@/services/unitServices";

export default function Pantry() {
  const { status } = useSession();
  const { data: pantry, isLoading: pantryLoading } = useSWR(
    status === "authenticated" ? "/api/pantry" : null
  );
  const { data: ingredients } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);

  if (status === "loading") return <h1>Loading...</h1>;
  if (status !== "authenticated") return <AccessDenied />;
  if (pantryLoading || !ingredients || !units) return <h1>Loading...</h1>;

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>My Pantry</PageTitle>
        <Subtitle>
          Track what you already have. Pantry amounts are subtracted from your
          shopping list automatically.
        </Subtitle>
      </PageHeader>

      <PantryAddForm
        ingredients={ingredients}
        units={units}
        pantry={pantry ?? []}
      />
      <PantryList pantry={pantry ?? []} />
    </PageContent>
  );
}

const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 36px 32px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 8px;

  @media (min-width: 641px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;
