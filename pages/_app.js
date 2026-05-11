import useSWR, { SWRConfig } from "swr";
import GlobalStyle from "../styles/global-styles";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useMemo, useRef } from "react";
import { SessionProvider, useSession } from "next-auth/react";

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
  return (
    <SessionProvider session={session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function AppContent({ Component, pageProps }) {
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

  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", {
    defaultValue: false,
  });

  const { data: userSession } = useSession();
  const { data: dbFavorites, mutate: mutateFavorites } = useSWR(
    userSession ? "/api/favorites" : null,
    fetcher
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const safeFavorites = useMemo(
    () => (Array.isArray(favoriteRecipes) ? favoriteRecipes : []),
    [favoriteRecipes]
  );
  const safeRecipesToShop = Array.isArray(recipesToShop) ? recipesToShop : [];
  const safeRecalculatedRecipes =
    typeof recalculatedRecipes === "object" && recalculatedRecipes !== null
      ? recalculatedRecipes
      : {};

  const activeFavorites = userSession
    ? (dbFavorites?.map((recipe) => recipe._id) ?? [])
    : safeFavorites;

  const hasMerged = useRef(false);

  useEffect(() => {
    if (userSession && safeFavorites.length > 0 && !hasMerged.current) {
      hasMerged.current = true;
      async function mergeFavorites() {
        await Promise.all(
          safeFavorites.map((id) =>
            fetch(`/api/favorites/${id}`, { method: "POST" })
          )
        );
        setFavoriteRecipes([]);
        mutateFavorites();
      }
      mergeFavorites();
    }
  }, [userSession, safeFavorites, mutateFavorites, setFavoriteRecipes]);

  async function handleToggleFavoriteRecipe(id) {
    if (userSession) {
      await fetch(`/api/favorites/${id}`, { method: "POST" });
      mutateFavorites();
    } else {
      if (!safeFavorites.includes(id)) {
        setFavoriteRecipes([...safeFavorites, id]);
      } else {
        setFavoriteRecipes(
          safeFavorites.filter((bookmarkedId) => bookmarkedId !== id)
        );
      }
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

  function handleToggleIsDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <Navbar
        favoriteRecipes={activeFavorites}
        recipesToShop={safeRecipesToShop}
        isDarkMode={isDarkMode}
        handleToggleIsDarkMode={handleToggleIsDarkMode}
      />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          favoriteRecipes={activeFavorites}
          handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
          recipesToShop={safeRecipesToShop}
          handleToggleRecipesToShop={handleToggleRecipesToShop}
          recalculatedRecipes={safeRecalculatedRecipes}
          handleAddRecalculatedRecipe={handleAddRecalculatedRecipe}
          handleRemoveRecalculatedRecipe={handleRemoveRecalculatedRecipe}
        />
      </SWRConfig>
    </>
  );
}
