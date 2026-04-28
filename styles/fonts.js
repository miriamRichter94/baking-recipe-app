import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";

// Downloads fonts at build time — no Google request at runtime
export const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const sourceSans3 = Source_Sans_3({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
