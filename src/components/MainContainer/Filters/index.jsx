import { LinearProgress } from "@material-ui/core";
import React, { memo, useCallback, useEffect, useState } from "react";
import { get, showError } from "../../../store/api";
import CustomSimpleMenu from "../../System/CustomSimpleMenu";
import CustomTextField from "../../System/CustomTextfield";

const floodedTypes = [
  {
    label: "Все",
    value: "",
  },
  {
    label: "Нет",
    value: "No",
  },
  {
    label: "1 месяц",
    value: "From0To1",
  },
  {
    label: "1-3 месяца",
    value: "From1To3",
  },
  {
    label: "3-6 месяцев",
    value: "From3To6",
  },
];

const soilTypes = [
  {
    label: "Все",
    value: "",
  },
  {
    label: "Глина",
    value: "Clay",
  },
  {
    label: "Пылеватая глина",
    value: "SiltyClay",
  },
  {
    label: "Пылеватое-глинистый суглинок",
    value: "SiltyClayLoam",
  },
  {
    label: "Опесчаненная глина",
    value: "SandyClay",
  },

  {
    label: "Опесчаненный глинистый суглинок",
    value: "SandyClayLoam",
  },
  {
    label: "Глинистый суглинок",
    value: "ClayLoam",
  },

  {
    label: "Тонкий суглинок",
    value: "Silt",
  },

  {
    label: "Пылеватый суглинок",
    value: "SiltLoam",
  },
  {
    label: "Суглинок",
    value: "Loam",
  },
  {
    label: "Суглинистый песок",
    value: "LoamySand",
  },
  {
    label: "Опесчаненный суглинок",
    value: "SandyLoam",
  },
];

export default memo(({ filtersValues, setFiltersValues, render }) => {
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState();
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const elHead = document.getElementById("header");
    const elFooter = document.getElementById("footer");

    const init = () => {
      setHeight(
        window.innerHeight - elHead.clientHeight - elFooter.clientHeight - 10
      );
    };

    init();

    document.addEventListener("resize", init);
    window.addEventListener("resize", init);

    return () => {
      document.removeEventListener("resize", init);
      window.removeEventListener("resize", init);
    };
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFiltersValues((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    },
    [setFiltersValues]
  );

  const fetcher = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await get(`http://51.250.23.5:9001/regions`);

      setRegions(data);

      setLoading(false);
    } catch (err) {
      showError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return (
    <div className="overflow-y-auto px-4" style={{ height: height }}>
      {loading && <LinearProgress />}

      <div className="flex flex-col" key={render}>
        <div className="mb-4">
          <h3 className="mb-1 text-sm">Регион</h3>
          <CustomSimpleMenu
            name="regionId"
            value={filtersValues?.regionId}
            options={[
              { label: "Все", value: "" },
              ...regions?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.id,
                };
              }),
            ]}
            onChange={onChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Затопляемость</h3>
          <CustomSimpleMenu
            name="floodedTypes"
            value={filtersValues?.floodedTypes}
            options={floodedTypes}
            onChange={onChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Тип почвы</h3>
          <CustomSimpleMenu
            name="soilTypes"
            value={filtersValues?.soilTypes}
            options={soilTypes}
            onChange={onChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Диапазон общей площади</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.minArea}
                name="minArea"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.maxArea}
                name="maxArea"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Диапазон свободной площади</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.minFreeArea}
                name="minFreeArea"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.maxFreeArea}
                name="maxFreeArea"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Диапазон угла ориентации</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.min_relief_aspect}
                name="min_relief_aspect"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.max_relief_aspect}
                name="max_relief_aspect"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm">Диапазон высоты местности</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.min_relief_height}
                name="min_relief_height"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.max_relief_height}
                name="max_relief_height"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm"> Диапазон угла местности</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.min_relief_slope}
                name="min_relief_slope"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.max_relief_slope}
                name="max_relief_slope"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-sm"> Диапазон солнечных дней:</h3>

          <div className="flex">
            <div className="mr-2">
              <CustomTextField
                value={filtersValues?.mix_sunny_days}
                name="mix_sunny_days"
                label="От"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className=" ml-2">
              <CustomTextField
                value={filtersValues?.man_sunny_days}
                name="man_sunny_days"
                label="До"
                type="number"
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
