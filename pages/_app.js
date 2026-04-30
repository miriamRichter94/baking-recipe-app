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
  const [shoppingList, setShoppingList] = useLocalStorageState("shoppingList", {
    defaultValue: [],
  });
  const [checkedItems, setCheckedItems] = useLocalStorageState("checkedItems", {
    defaultValue: [],
  });

  const safeFavorites = Array.isArray(favoriteRecipes) ? favoriteRecipes : [];
  const safeShoppingList = Array.isArray(shoppingList) ? shoppingList : [];
  const safeCheckedItems = Array.isArray(checkedItems) ? checkedItems : [];

  function handleToggleFavoriteRecipe(id) {
    if (!safeFavorites.includes(id)) {
      setFavoriteRecipes([...safeFavorites, id]);
    } else {
      setFavoriteRecipes(
        safeFavorites.filter((bookmarkedId) => bookmarkedId !== id)
      );
    }
  }

  function handleAddToShoppingList(recipe) {
    const ingredients = recipe.ingredients.map((ing) => ({
      id: ing._id,
      name: ing.ingredient.name,
      amount: ing.amount,
      unit: ing.unit.name,
    }));
    const entry = {
      recipeId: recipe._id,
      recipeTitle: recipe.title,
      ingredients,
    };
    const filtered = safeShoppingList.filter(
      (item) => item.recipeId !== recipe._id
    );
    setShoppingList([...filtered, entry]);
  }

  function handleRemoveFromShoppingList(recipeId) {
    setShoppingList(
      safeShoppingList.filter((item) => item.recipeId !== recipeId)
    );
    setCheckedItems(
      safeCheckedItems.filter((key) => !key.startsWith(recipeId + "_"))
    );
  }

  function handleToggleCheckedItem(key) {
    if (safeCheckedItems.includes(key)) {
      setCheckedItems(safeCheckedItems.filter((k) => k !== key));
    } else {
      setCheckedItems([...safeCheckedItems, key]);
    }
  }

  function handleClearChecked() {
    setCheckedItems([]);
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
          shoppingList={safeShoppingList}
          checkedItems={safeCheckedItems}
          handleAddToShoppingList={handleAddToShoppingList}
          handleRemoveFromShoppingList={handleRemoveFromShoppingList}
          handleToggleCheckedItem={handleToggleCheckedItem}
          handleClearChecked={handleClearChecked}
        />
      </SWRConfig>
    </>
  );
}
