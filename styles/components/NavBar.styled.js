import styled from "styled-components";

// ─── Styled Components ───────────────────────────────────────────────────────

export const Nav = styled.nav`
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

export const NavBrand = styled.div`
  font-family: var(--font-heading), serif;
  font-size: 22px;
  color: #8b5e3c;

  @media (min-width: 641px) {
    font-size: 26px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #8c7b6b;

  @media (min-width: 641px) {
    gap: 24px;
  }
`;

export const NavLinkActive = styled.span`
  color: #8b5e3c;
  font-weight: 600;
  cursor: pointer;
`;

export const NavLinkInactive = styled.span`
  cursor: pointer;

  &:hover {
    color: #8b5e3c;
  }
`;

// Back button shown on detail / form pages instead of the brand
export const NavBackButton = styled.button`
  background: none;
  border: none;
  color: #8b5e3c;
  font-family: var(--font-body), sans-serif;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Centred page title shown next to the back button
export const NavCentreTitle = styled.span`
  font-family: var(--font-heading), serif;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Two modes:
//   • Home mode  → shows brand + nav links
//   • Back mode  → shows back button + optional centred title
//
// Usage:
//   <NavBar />                                    ← home
//   <NavBar onBack={() => router.back()} />       ← back, no title
//   <NavBar onBack={…} title="Classic Sourdough" /> ← back + title

export default function NavBar({ title, onBack }) {
  return (
    <Nav>
      {onBack ? (
        <>
          <NavBackButton onClick={onBack}>← Back</NavBackButton>
          {title && <NavCentreTitle>{title}</NavCentreTitle>}
          {/* spacer keeps the back button left-aligned */}
          <div style={{ width: 60 }} />
        </>
      ) : (
        <>
          <NavBrand>BakeBook</NavBrand>
          <NavLinks>
            <NavLinkActive>Recipes</NavLinkActive>
            <NavLinkInactive>Favorites</NavLinkInactive>
          </NavLinks>
        </>
      )}
    </Nav>
  );
}
