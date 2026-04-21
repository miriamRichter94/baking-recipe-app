import RecipeForm from "@/components/RecipeFormular/RecipeForm";

export default function RecipeFormular({ ingredients, units }) {
  return (
    <>
      <h1>The Formular </h1>
      <p>The Formular page</p>
      <RecipeForm ingredients={ingredients} units={units} />
    </>
  );
}
