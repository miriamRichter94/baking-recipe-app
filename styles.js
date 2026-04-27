import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Source Sans 3', system-ui, sans-serif;
    background: #faf6f1;
    color: #3d2b1f;
  }

  /* Responsive visibility helpers used by the design components */
  .mobile-only {
    display: block;

    @media (min-width: 641px) {
      display: none;
    }
  }

  .desktop-only {
    display: none;

    @media (min-width: 641px) {
      display: block;
    }
  }

  /* Desktop "Add New Recipe" button (shown above the grid) */
  .desktop-add-btn {
    display: none !important;

    @media (min-width: 641px) {
      display: block !important;
    }
  }
`;
