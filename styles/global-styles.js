import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
  :root {
  --bg: #FAF6F1;
  --text-muted: #8C7B6B;
  --border: #E8DDD2;
  --danger: #B5473A;
  --radius: 12px;
  --font-heading: var(--font-heading), serif;
  --font-body: var(--font-heading), sans-serif;
}
}


  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans 3', system-ui, sans-serif;
    background: #faf6f1;
    color: #3d2b1f;
  }
`;
