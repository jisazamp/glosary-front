import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCategories, Category, useGetConcepts } from "../../hooks";
import { useState } from "react";

export const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { data: categories } = useGetCategories();
  const { data: concepts } = useGetConcepts({ category: selectedCategory });

  const onCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <ul>
        {categories?.data.data.map((category) => (
          <Typography
            component="li"
            key={category.id}
            style={{ cursor: "pointer" }}
            onClick={() => onCategoryChange(category)}
          >
            {category.attributes.name}
          </Typography>
        ))}

        <Typography
          component="li"
          style={{ cursor: "pointer" }}
          onClick={() => onCategoryChange(null)}
        >
          Todas
        </Typography>
      </ul>

      <Typography component="p">
        Selected category:{" "}
        {selectedCategory ? selectedCategory.attributes.name : "Todas"}
      </Typography>

      <ul>
        {concepts?.data.data.map((concept) => (
          <Typography
            component={Link}
            key={concept.id}
            to={`/terminos/${concept.id}`}
            sx={{ textDecoration: "none", color: "#000" }}
          >
            <Typography>{concept.attributes.name}</Typography>
          </Typography>
        ))}
      </ul>
    </Container>
  );
};
