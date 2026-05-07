import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Navbar({ favoriteRecipes, recipesToShop }) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isFavorite = router.pathname === "/favorites";
  const isShoppinglist = router.pathname === "/shoppinglist";
  const title = getTitle(router.pathname, router.query);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  function getTitle(pathname, query) {
    if (pathname === "/recipe/[id]") return "Recipe";
    if (pathname === "/form/[slug]") {
      if (query.slug === "create") return "Add new Recipe";
      if (query.slug?.startsWith("edit")) return "Edit the Recipe";
    }
    return null;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Nav>
      {!isHome && !isFavorite && !isShoppinglist ? (
        <>
          <NavBackButton
            onClick={() => router.back()}
            aria-label="Back to previous Page"
          >
            ← Back
          </NavBackButton>
          <NavTitle>{title}</NavTitle>
          {/* spacer keeps the back button left-aligned */}
          <div style={{ width: 60 }} />
        </>
      ) : (
        <>
          <NavTitle>BakeBook</NavTitle>

          {/* Mobile hamburger */}
          <HamburgerBtn
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </HamburgerBtn>

          {/* Desktop links + Mobile dropdown */}
          <NavLinks $open={menuOpen}>
            <NavLink
              href="/"
              $active={isHome}
              onClick={() => setMenuOpen(false)}
            >
              Recipes
            </NavLink>
            <NavLink
              href="/favorites"
              $active={isFavorite}
              onClick={() => setMenuOpen(false)}
            >
              {favoriteRecipes.length === 0 ? "🤍" : "♥️"} Favorites
            </NavLink>
            {session && (
              <NavLink
                href="/shoppinglist"
                $active={isShoppinglist}
                onClick={() => setMenuOpen(false)}
              >
                {recipesToShop.length === 0 ? (
                  <Image
                    src="/assets/shopping-cart-basic.png"
                    width={20}
                    height={20}
                    alt="Empty Shopping cart"
                  />
                ) : (
                  <Image
                    src="/assets/shopping-cart-filled.png"
                    width={20}
                    height={20}
                    alt="filled shopping cart"
                  />
                )}
                ShoppingList
              </NavLink>
            )}
          </NavLinks>
        </>
      )}
    </Nav>
  );
}

// ─── Styled Components ───────────────────────────────────────────────────────

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8ddd2;
  background: #faf6f1;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (min-width: 641px) {
    padding: 20px 32px;
  }
`;

const NavTitle = styled.div`
  font-family: var(--heading-font);
  font-size: 22px;
  color: var(--nav-font-color);

  @media (min-width: 641px) {
    font-size: 26px;
  }
`;

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: var(--nav-font-color);
  padding: 0;
  display: flex;

  @media (min-width: 641px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  /* Mobile: hidden dropdown */
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background: #faf6f1;
  border-bottom: 1px solid #e8ddd2;
  padding: 16px 20px;
  gap: 16px;
  width: 100%;
  font-size: 14px;

  /* Desktop: always visible inline */
  @media (min-width: 641px) {
    display: flex;
    flex-direction: row;
    position: static;
    width: auto;
    padding: 0;
    border: none;
    gap: 24px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "var(--nav-font-color)" : "#8c7b6b")};

  &:hover {
    color: var(--nav-font-color);
  }
`;

// Back button shown on detail / form pages instead of the brand
const NavBackButton = styled.button`
  visibility: hidden;
  @media (min-width: 641px) {
    visibility: visible;
    background: none;
    border: none;
    color: var(--nav-font-color);
    font-size: 15px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
