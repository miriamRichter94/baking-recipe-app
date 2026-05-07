import { SWRConfig } from "swr";
import GlobalStyle from "../styles/global-styles";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import useLocalStorageState from "use-local-storage-state";
import { SessionProvider } from "next-auth/react";
import Login from "@/components/Login/Login";

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorageState(
    "favoriteRecipes",
    { defaultValue: [] }
  );

  const [recipesToShop, setRecipesToShop] = useLocalStorageState(
    "recipesToShop",
    { defaultValue: [] }
  );

  const [recalculatedRecipes, setRecalculatedRecipes] = useLocalStorageState(
    "recalculatedRecipes",
    { defaultValue: {} }
  );

  const safeFavorites = Array.isArray(favoriteRecipes) ? favoriteRecipes : [];
  const safeRecipesToShop = Array.isArray(recipesToShop) ? recipesToShop : [];
  const safeRecalculatedRecipes =
    typeof recalculatedRecipes === "object" && recalculatedRecipes !== null
      ? recalculatedRecipes
      : {};

  function handleToggleFavoriteRecipe(id) {
    if (!safeFavorites.includes(id)) {
      setFavoriteRecipes([...safeFavorites, id]);
    } else {
      setFavoriteRecipes(
        safeFavorites.filter((bookmarkedId) => bookmarkedId !== id)
      );
    }
  }

  function handleToggleRecipesToShop(id) {
    if (!safeRecipesToShop.includes(id)) {
      setRecipesToShop([...safeRecipesToShop, id]);
    } else {
      setRecipesToShop(
        safeRecipesToShop.filter((bookmarkedId) => bookmarkedId !== id)
      );
    }
  }

  function handleAddRecalculatedRecipe(
    id,
    shape,
    diameter = null,
    width = null,
    length = null,
    scalingFactor
  ) {
    setRecalculatedRecipes({
      ...safeRecalculatedRecipes,
      [id]: { shape, diameter, width, length, scalingFactor },
    });
  }

  function handleRemoveRecalculatedRecipe(id) {
    const { [id]: _, ...rest } = safeRecalculatedRecipes;
    setRecalculatedRecipes(rest);
  }

  return (
    <>
      <SessionProvider session={session}>
        <GlobalStyle />
        <Toaster />
        <Login />
        <Navbar
          favoriteRecipes={safeFavorites}
          recipesToShop={safeRecipesToShop}
        />
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            favoriteRecipes={safeFavorites}
            handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
            recipesToShop={safeRecipesToShop}
            handleToggleRecipesToShop={handleToggleRecipesToShop}
            recalculatedRecipes={safeRecalculatedRecipes}
            handleAddRecalculatedRecipe={handleAddRecalculatedRecipe}
            handleRemoveRecalculatedRecipe={handleRemoveRecalculatedRecipe}
          />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
