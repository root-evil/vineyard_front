import { useQuery } from "react-query";
import { get, showError } from "../store/api/index";

export const useQueryTerritorys = (params, currentBounds) => {
  const p = {
    ...(params || {}),
    currentBounds,
  };

  return useQuery(
    ["useQueryTerritorys", p],
    async () => {
      try {
        const { data } = await get(
          `http://51.250.23.5:9001/map?bounds=${currentBounds}`,
          params
        );

        return data;
      } catch (err) {
        console.log(err);
        showError(err);
        return;
      }
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      keepPreviousData: false,
      enabled: Boolean(currentBounds?.length > 1),
    }
  );
};
