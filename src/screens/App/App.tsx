import {
  Box,
  Container,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useGetCategories, Category, useGetConcepts } from "../../hooks";
import { useState } from "react";

export const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [search, setSearch] = useState<string>("");

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: concepts, isLoading: isLoadingConcepts } = useGetConcepts({
    category: selectedCategory,
    search,
  });

  const isLoading = isLoadingConcepts || isLoadingCategories;
  const loadingComponent = (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        height: "200px",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );

  const onCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="flex-end"
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Buscar"
          size="small"
          sx={{ maxWidth: "300px" }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Box>

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

      {isLoading ? (
        loadingComponent
      ) : (
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
      )}
    </Container>
  );
};
