import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import { getAllIngredients, getAllUnits } from "@/services/recipeService";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occured while fetching the data!");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({ Component, pageProps }) {
  const {
    data: ingredients,
    isLoading,
    error,
  } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);

  if (isLoading || !ingredients || !units) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} ingredients={ingredients} units={units} />
      </SWRConfig>
    </>
  );
}
