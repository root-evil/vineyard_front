import { useQuery } from "react-query";
import { get, showError } from "../store/api";

export const useQueryTerritoryDetails = (paramsId) => {
  return useQuery(
    ["useQueryTerritoryDetails", paramsId],
    async () => {
      try {
        const { data } = await get(
          `http://51.250.23.5:9001/details/${paramsId}`
        );

        return data;
      } catch (err) {
        showError(err);
        return;
      }
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      keepPreviousData: false,
      enabled: Boolean(paramsId),
    }
  );
};
