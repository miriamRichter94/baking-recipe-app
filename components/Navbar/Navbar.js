import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Navbar() {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isFavorite = router.pathname === "/favorites";
  const isShoppingList = router.pathname === "/shopping-list";
  const title = getTitle(router.pathname, router.query);
  const [mounted, setMounted] = useState(false);

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
      {!isHome && !isFavorite && !isShoppingList ? (
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
          <NavLinks>
            <NavLink href="/" $active={isHome}>
              Recipes
            </NavLink>
            <NavLink href="/favorites" $active={isFavorite}>
              Favorites
            </NavLink>
            <NavLink href="/shopping-list" $active={isShoppingList}>
              Shopping
            </NavLink>
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

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #8c7b6b;

  @media (min-width: 641px) {
    gap: 24px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "var(--nav-font-color)" : "#8c7b6b")};

  &:hover {
    color: var(--nav-font-color);
  }
`;

// Back button shown on detail / form pages instead of the brand
const NavBackButton = styled.button`
  background: none;
  border: none;
  color: var(--nav-font-color);
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;
