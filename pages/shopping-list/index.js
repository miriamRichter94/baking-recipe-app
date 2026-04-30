import ShoppingList from "@/components/ShoppingList/ShoppingList";

export default function ShoppingListPage({
  shoppingList,
  checkedItems,
  handleToggleCheckedItem,
  handleRemoveFromShoppingList,
  handleClearChecked,
}) {
  return (
    <ShoppingList
      shoppingList={shoppingList}
      checkedItems={checkedItems}
      onToggleChecked={handleToggleCheckedItem}
      onRemoveRecipe={handleRemoveFromShoppingList}
      onClearChecked={handleClearChecked}
    />
  );
}
