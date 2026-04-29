import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
  --background: #FAF6F1;
  --text-muted: #8C7B6B;
  --text-color: #3d2b1f;
  --border: #E8DDD2;
  --danger: #B5473A;
  --radius: 12px;
  --heading-font: var(--font-heading), serif;
  --body-font: var(--font-body), system-ui, sans-serif;
  --nav-font-color: #8b5e3c;
  --recipe-card-background: #fdfdfd;

}


  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: var(--body-font);
    background: var(--background);
    color: var(--text-color);
  min-height: 100vh;
  }

  button, input, select, textarea {
  font-family: inherit;
}
`;
