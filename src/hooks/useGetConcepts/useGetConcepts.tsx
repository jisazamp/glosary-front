import type { ApiResponse } from "../../types";
import type { Category } from "../useGetCategories/useGetCategories";
import { Author } from "../useGetAuthors/useGetAuthors";
import { instance } from "../../api";
import { useDebounce } from "../useDebounce/useDebounce";
import { useQuery } from "@tanstack/react-query";

export type Concept = {
  authors: {
    data: { id: number; attributes: Author }[];
  };
  content: string;
  createdAt: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
};

export interface UseGetConceptsResponse extends ApiResponse {
  data: { id: number; attributes: Concept }[];
}

interface Props {
  category?: Category | null;
  search?: string;
}

export const useGetConcepts = ({ category, search }: Props) => {
  const categoryFilter = category
    ? `filters[categories][id][$eq]=${category.id}`
    : "";
  const searchFilter = search ? `filters[name][$contains]=${search}` : "";
  const [searchFilterDebounced] = useDebounce([searchFilter], 500);
  const filters = [categoryFilter, searchFilter].filter((f) => f).join("&");

  const fetchConcepts = () =>
    instance.get<UseGetConceptsResponse>(`concepts${filters && "?" + filters}`);

  const query = useQuery({
    queryKey: ["concepts", category, ...searchFilterDebounced],
    queryFn: fetchConcepts,
    staleTime: 1000 * 60 * 5000,
  });

  return query;
};
