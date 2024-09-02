import type { ApiResponse } from "../../types";
import { instance } from "../../api";
import { useQuery } from "@tanstack/react-query";

export type Author = {
  createdAt: string;
  firstName: string;
  lastName: string;
  publishedAt: string;
  updatedAt: string;
};

export interface UseGetAuthorsResponse extends ApiResponse {
  data: { id: number; attributes: Author }[];
}

export const useGetAuthors = () => {
  const fetchAuthors = () => instance.get<UseGetAuthorsResponse>("authors");

  const query = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
    staleTime: 1000 * 60 * 5000,
  });

  return query;
};
