import { UseGetConceptsResponse } from "../useGetConcepts/useGetConcepts";
import { instance } from "../../api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  conceptId: string;
}

export const useGetConcept = ({ conceptId }: Props) => {
  const fetchConcept = () =>
    instance<UseGetConceptsResponse>(
      `concepts?filters[id][$eq]=${conceptId}&populate=*`
    );

  const query = useQuery({
    queryKey: ["concept", conceptId],
    queryFn: fetchConcept,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
