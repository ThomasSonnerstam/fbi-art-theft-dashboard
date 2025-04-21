import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { WantedPerson } from "../types/wantedPerson";

const FBI_API_URL = "https://api.fbi.gov/wanted/v1/list";
const API_KEY = import.meta.env.VITE_FBI_API_KEY;

export type WantedResponse = {
  items: WantedPerson[];
  total: number;
  page: number;
};

async function fetchWantedPersons(
  page: number,
  pageSize: number
): Promise<WantedResponse> {
  const response = await fetch(
    `${FBI_API_URL}?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "FBI-API-KEY": API_KEY || "",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch wanted persons");
  }

  return response.json();
}

export const useWantedPersons = (
  page: number = 1,
  pageSize: number = 20
): UseQueryResult<WantedResponse, Error> => {
  return useQuery({
    queryKey: ["wantedPersons", page, pageSize],
    queryFn: () => fetchWantedPersons(page, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};
