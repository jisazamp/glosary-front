import type { ApiResponse } from "../../types";
import { instance } from "../../api";
import { useQuery } from "@tanstack/react-query";

export type Category = {
  id: number;
  attributes: {
    createdAt: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
  };
};

export interface UseGetCategoriesResponse extends ApiResponse {
  data: Category[];
}

export const useGetCategories = () => {
  const fetchCategories = () =>
    instance.get<UseGetCategoriesResponse>("categories");
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5000,
  });

  return query;
};
