import type { ApiResponse } from "../../types";
import type { Category } from "../useGetCategories/useGetCategories";
import { instance } from "../../api";
import { useQuery } from "@tanstack/react-query";

export type Concept = {
  id: number;
  attributes: {
    createdAt: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
  };
};

export interface UseGetConceptsResponse extends ApiResponse {
  data: Concept[];
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
