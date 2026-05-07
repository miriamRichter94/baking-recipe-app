import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
  --color-brand: #8b5e3c;
  --color-brand-light: #e8d5c4;
  --color-text: #3d2b1f;
  --color-text-muted: #8c7b6b;
  --color-surface: #faf6f1;
  --color-surface-alt: #fdfdfd;
  --color-border: #e8ddd2;
  --color-border-alt: #c49a6c;
  --color-danger: #b5473a;
  --color-image-bg: #ede5da;
  --color-overlay: rgba(61, 43, 31, 0.5);      /* modal backdrop */
  --color-shadow: rgba(60, 40, 20, 0.07);       /* default card shadow */
  --color-shadow-hover: rgba(60, 40, 20, 0.13); /* hover card shadow */
  --color-shadow-strong: rgba(60, 40, 20, 0.18);/* modal shadow */
  --color-brand-shadow: rgba(139, 94, 60, 0.35);/* FAB shadow */
  --color-background-action-btn:rgba(255, 255, 255, 0.92);
  --heading-font: var(--font-heading), serif;
  --body-font: var(--font-body), system-ui, sans-serif;
}

:root.dark-mode{
    --color-brand: #c49a6c;
  --color-brand-light: #3d3028;
  --color-text: #ede5da;
  --color-text-muted: #9b8a7e;
  --color-surface: #1c1815;
  --color-surface-alt: #282320;
  --color-border: #3a332c;
  --color-border-alt: #8b5e3c;
  --color-danger: #d4645a;
  --color-image-bg: #302a24;
  --color-overlay: rgba(0, 0, 0, 0.65);          /* modal backdrop */
  --color-shadow: rgba(0, 0, 0, 0.35);           /* default card shadow */
  --color-shadow-hover: rgba(0, 0, 0, 0.5);      /* hover card shadow */
  --color-shadow-strong: rgba(0, 0, 0, 0.65);    /* modal shadow */
  --color-brand-shadow: rgba(196, 154, 108, 0.4);/* FAB shadow */
  --color-background-action-btn: #c49a6c;
}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: var(--body-font);
    background: var(--color-surface);
    color: var(--color-text);
    min-height: 100vh;
  }

  button, input, select, textarea {
  font-family: inherit;
}
`;
