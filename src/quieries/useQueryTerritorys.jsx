import { useQuery } from "react-query";
import { get, showError } from "../store/api/index";

export const useQueryTerritorys = (params) => {
  return useQuery(
    ["useQueryTerritorys", params],
    async () => {
      try {
        const { data } = await get(`http://51.250.23.5:9001/polygons`);

        const newObj = { ...data };

        newObj?.data?.forEach((item, index) => {
          item?.longitude?.forEach((g, indexG) => {
            newObj.data[index].geo = [
              ...(newObj.data[index].geo || []),
              [g, item?.latitude?.[indexG]],
            ];
          });
        });

        return newObj;
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
    }
  );
};
