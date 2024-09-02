import type { ApiResponse } from "../../types";
import type { Category } from "../useGetCategories/useGetCategories";
import { Author } from "../useGetAuthors/useGetAuthors";
import { instance } from "../../api";
import { useQuery } from "@tanstack/react-query";

export type Concept = {
  createdAt: string;
  name: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  authors: {
    data: { id: number; attributes: Author }[];
  };
};

export interface UseGetConceptsResponse extends ApiResponse {
  data: { id: number; attributes: Concept }[];
}

interface Props {
  category?: Category | null;
}

export const useGetConcepts = ({ category }: Props) => {
  const categoryFilter = category
    ? `?filters[categories][id][$eq]=${category.id}`
    : "";

  const fetchConcepts = () =>
    instance.get<UseGetConceptsResponse>("concepts" + categoryFilter);

  const query = useQuery({
    queryKey: ["concepts", category],
    queryFn: fetchConcepts,
    staleTime: 1000 * 60 * 5000,
  });

  return query;
};
