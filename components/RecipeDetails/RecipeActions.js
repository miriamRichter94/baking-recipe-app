import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import ModalBox from "../ModalBox/ModalBox";
import StyledButton from "../Button/StyledButton";

export default function RecipeActions({
  recipe,
  favoriteRecipes,
  onToggleFavoriteRecipe,
  recipesToShop,
  onToggleRecipesToShop,
  variant,
}) {
  const { data: session } = useSession();
  const isFavorite = favoriteRecipes.includes(recipe._id);
  const isInShoppingList = recipesToShop.includes(recipe._id);

  if (variant === "hero") {
    return (
      <HeroActions>
        {session && (
          <HeroEditBtn as={Link} href={`/form/edit-${recipe._id}`} aria-label="Edit">
            <Image src="/assets/pencil.png" width={35} height={35} alt="Edit pencil" />
          </HeroEditBtn>
        )}
        {session && (
          <HeroDelete as="div">
            <ModalBox type="delete" styleType="transparent" recipeId={recipe._id}>
              <Image src="/assets/garbage.png" width={25} height={25} alt="Trash Can" />
            </ModalBox>
          </HeroDelete>
        )}
        <HeroFavorite onClick={() => onToggleFavoriteRecipe(recipe._id)}>
          {isFavorite ? "♥️" : "🤍"}
        </HeroFavorite>
        {session && (
          <HeroShoppingList onClick={() => onToggleRecipesToShop(recipe._id)}>
            <Image
              src={isInShoppingList ? "/assets/shopping-cart-added.png" : "/assets/shopping-cart-add.png"}
              width={30}
              height={30}
              alt={isInShoppingList ? "Remove from shopping list" : "Add to shopping list"}
            />
          </HeroShoppingList>
        )}
      </HeroActions>
    );
  }

  return (
    <DesktopActionRow>
      {session && (
        <StyledButton as={Link} href={`/form/edit-${recipe._id}`}>
          Edit Recipe
        </StyledButton>
      )}
      <StyledButton onClick={() => onToggleFavoriteRecipe(recipe._id)}>
        {isFavorite ? "♥️" : "🤍"}
      </StyledButton>
      {session && (
        <>
          <StyledButton onClick={() => onToggleRecipesToShop(recipe._id)}>
            <Image
              src={isInShoppingList ? "/assets/shopping-cart-added.png" : "/assets/shopping-cart-add.png"}
              width={30}
              height={30}
              alt={isInShoppingList ? "Remove from shopping list" : "Add to shopping list"}
            />
          </StyledButton>
          <ModalBox type="delete" recipeId={recipe._id}>
            <Image src="/assets/garbage.png" width={25} height={25} alt="Trash Can" />
          </ModalBox>
        </>
      )}
    </DesktopActionRow>
  );
}

const HeroIconBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--color-background-action-btn);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;

  @media (min-width: 641px) {
    display: none;
  }
`;

const HeroActions = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 641px) {
    display: none;
  }
`;

const HeroEditBtn = styled(HeroIconBtn)`
  padding: 3px;
  font-size: 14px;
`;

const HeroDelete = styled(HeroIconBtn)`
  padding: 3px;
`;

const HeroFavorite = styled(HeroIconBtn)`
  padding: 3px;
  font-size: 24px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
`;

const HeroShoppingList = styled(HeroIconBtn)`
  padding: 3px;
`;

const DesktopActionRow = styled.div`
  display: flex;
  gap: 12px;
`;
