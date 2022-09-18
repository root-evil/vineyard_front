import { useQuery } from "react-query";
import { get, showError } from "../store/api";

export const useQueryTerritoryDetails = (params) => {
  const p = {
    ...params,
  };

  return useQuery(
    ["useQueryTerritoryDetails", p],
    async () => {
      try {
        const { data } = await get(
          `http://51.250.23.5:9001/params/${params?.id}`
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
      enabled: Boolean(params?.lon && params?.lat),
    }
  );
};
