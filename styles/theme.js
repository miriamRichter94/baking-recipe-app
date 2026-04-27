// Design tokens — Warm Classic theme
// Fonts are loaded via next/font/google (styles/fonts.js) and exposed
// as CSS variables on <html>. Styled components reference them via var().

const theme = {
  bg:          "#FAF6F1",
  card:        "#FFFFFF",
  accent:      "#8B5E3C",
  accentLight: "#C49A6C",
  accentSoft:  "#E8D5C4",
  text:        "#3D2B1F",
  textMuted:   "#8C7B6B",
  border:      "#E8DDD2",
  danger:      "#B5473A",
  heading:     "var(--font-heading), serif",
  body:        "var(--font-body), sans-serif",
  radius:      "12px",
};

export default theme;
