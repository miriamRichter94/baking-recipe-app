import { SWRConfig } from "swr";
import GlobalStyle from "../styles/global-styles";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import useLocalStorageState from "use-local-storage-state";

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
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorageState(
    "favoriteRecipes",
    { defaultValue: [] }
  );

  const safeFavorites = Array.isArray(favoriteRecipes) ? favoriteRecipes : [];

  function handleToggleFavoriteRecipe(id) {
    if (!safeFavorites.includes(id)) {
      setFavoriteRecipes([...safeFavorites, id]);
    } else {
      setFavoriteRecipes(
        safeFavorites.filter((bookmarkedId) => bookmarkedId != id)
      );
    }
  }

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <Navbar />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          favoriteRecipes={safeFavorites}
          handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
        />
      </SWRConfig>
    </>
  );
}
