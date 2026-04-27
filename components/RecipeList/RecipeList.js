import { useState } from "react";
import { useRouter } from "next/router";
import RecipePreview from "./RecipePreview";
import NavBar from "@/styles/components/NavBar.styled";
import {
  PageWrapper,
  PageContent,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SearchWrapper,
  SearchInput,
  CategoryRow,
  CategoryPill,
  RecipeGrid,
  FAB,
} from "@/styles/components/HomePage.styled";
import Btn from "@/styles/components/Btn.styled";

const CATEGORIES = ["All", "Bread", "Cakes", "Pastry", "Cookies"];

export default function RecipeList({ recipes }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <NavBar />

      <PageContent>
        <PageHeader>
          <PageTitle>Your Baking Recipes</PageTitle>
          <PageSubtitle>Simple recipes, made with love</PageSubtitle>
        </PageHeader>

        {/* Search bar */}
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        {/* Category pills (mobile) */}
        <CategoryRow>
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryPill>
          ))}
        </CategoryRow>

        {/* Add button (desktop) */}
        <div className="desktop-add-btn" style={{ textAlign: "center", marginBottom: 32 }}>
          <Btn variant="pill" onClick={() => router.push("/form/create")}>
            + Add New Recipe
          </Btn>
        </div>

        {/* Recipe grid — uses <ul> semantics via RecipePreview's <li> */}
        <RecipeGrid as="ul" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((recipe) => (
            <RecipePreview key={recipe._id} recipe={recipe} />
          ))}
        </RecipeGrid>
      </PageContent>

      {/* Mobile FAB */}
      <FAB onClick={() => router.push("/form/create")} aria-label="Add new recipe">
        +
      </FAB>
    </PageWrapper>
  );
}
