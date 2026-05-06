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
  --color-danger: #b5473a;
  --radius: 12px;
  --heading-font: var(--font-heading), serif;
  --body-font: var(--font-body), system-ui, sans-serif;
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
