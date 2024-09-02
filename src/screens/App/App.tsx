import { useState } from "react";
import { useGetCategories, Category, useGetConcepts } from "../../hooks";

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
    <div>
      <ul>
        {categories?.data.data.map((category) => (
          <li
            key={category.id}
            style={{ cursor: "pointer" }}
            onClick={() => onCategoryChange(category)}
          >
            {category.attributes.name}
          </li>
        ))}
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onCategoryChange(null)}
        >
          Todas
        </li>
      </ul>

      <p>
        Selected category:{" "}
        {selectedCategory ? selectedCategory.attributes.name : "Todas"}
      </p>

      <ul>
        {concepts?.data.data.map((concept) => (
          <li key={concept.id}>{concept.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
};
