import { useQuery } from "react-query";

export const useQueryTerritoryDetails = (params, territoryId) => {
  const p = {
    ...params,
    territoryId,
  };

  return useQuery(
    ["useQueryTerritoryDetails", p],
    async () => {
      try {
        console.log(1);

        /*  const { data } = await get(
          `${import.meta.env.VITE_API}/v1/admin/events/${eventId}/details`
        ); */
      } catch (err) {
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
