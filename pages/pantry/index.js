import useSWR from "swr";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";
import Page from "@/components/Page/Page";
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
    <Page width="narrow">
      <Page.Header>
        <Page.Title>My Pantry</Page.Title>
        <Page.Subtitle>
          Track what you already have. Pantry amounts are subtracted from your
          shopping list automatically.
        </Page.Subtitle>
      </Page.Header>

      <PantryAddForm
        ingredients={ingredients}
        units={units}
        pantry={pantry ?? []}
      />
      <PantryList pantry={pantry ?? []} />
    </Page>
  );
}
