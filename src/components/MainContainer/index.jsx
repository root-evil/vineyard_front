import {
  Drawer,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowBack, CloseOutlined } from "@material-ui/icons";
import { parse } from "query-string";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryTerritoryDetails } from "../../quieries/useQueryTerritoryDetails";

import {
  Map,
  Placemark,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";
import { useQueryTerritorys } from "../../quieries/useQueryTerritorys";

/* 
 ref.current?.setCenter([55.7, 37.57])
 
 */

/* ref.current?.getBounds() */

const converterFlooded = (flooded) => {
  if (flooded === "No") {
    return 0;
  }

  if (flooded === "From0To1") {
    return 1;
  }

  if (flooded === "From1To3") {
    return "1-3";
  }

  if (flooded === "From3To6") {
    return "3-6";
  }
};

const converterSoil = (soil) => {
  if (soil === "Clay") {
    return "Глина";
  }

  if (soil === "SiltyClay") {
    return "Пылеватая глина";
  }

  if (soil === "SiltyClayLoam") {
    return "Пылеватое-глинистый суглинок";
  }

  if (soil === "SandyClay") {
    return "Опесчаненная глина";
  }

  if (soil === "SandyClayLoam") {
    return "Опесчаненный глинистый суглинок";
  }

  if (soil === "ClayLoam") {
    return "Глинистый суглинок";
  }

  if (soil === "Silt") {
    return "Тонкий суглинок";
  }

  if (soil === "SiltLoam") {
    return "Пылеватый суглинок";
  }

  if (soil === "Loam") {
    return "Суглинок";
  }

  if (soil === "Sand") {
    return "Песок";
  }

  if (soil === "LoamySand") {
    return "Суглинистый песок";
  }

  if (soil === "SandyLoam") {
    return "Опесчаненный суглинок";
  }
};

export default memo(() => {
  const theme = useTheme();
  const navigate = useNavigate();
  const urlParams = useParams();
  const location = useLocation();
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(600);
  const allPolygons = useQueryTerritorys({});
  const params = parse(location.search);

  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const details = useQueryTerritoryDetails({ id: urlParams?.id, ...params });

  const ref = useRef();

  useLayoutEffect(() => {
    const el = document.getElementById("filters");

    setWidth(window.innerWidth - el.clientWidth);
    setHeight(el.clientHeight);
  }, []);

  useLayoutEffect(() => {
    if (params?.lat && params?.lon) {
      setTimeout(() => {
        ref.current?.setCenter([params?.lon, params?.lat]);
      }, 100);
    } else if (allPolygons?.data?.center) {
      setTimeout(() => {
        ref.current?.setCenter(allPolygons?.data?.center);
      }, 100);
    } else {
      setTimeout(() => {
        ref.current?.setCenter([45.19697869737061, 39.1890641332174]);
      }, 100);
    }
  }, [
    allPolygons?.data?.center,
    navigate,
    params.id,
    params?.lat,
    params?.lon,
    urlParams?.id,
  ]);

  useEffect(() => {
    const el = document.getElementById("filters");

    const init = () => {
      setWidth(window.innerWidth - el.clientWidth - 15);
      setHeight(el.clientHeight);
    };

    document.addEventListener("resize", init, false);
    window.addEventListener("resize", init, false);

    return () => {
      document.removeEventListener("resize", init);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex flex-col h-full sm:flex-row">
          <div
            className="w-full h-full max-w-full shadow-2xl border-r-2 border-[rgb(0 0 0 / 0.2)] sm:max-w-[300px]"
            id="filters"
          >
            <div className="flex flex-col mt-2 text-base">
              <h1 className="text-center text-xl mb-6">Фильтры</h1>

              <span className="mb-4 border-b  border-b-gray-200 pb-1 m-2">
                Фильтр 1
              </span>
              <span className="mb-4 border-b  border-b-gray-200 pb-1 m-2">
                Фильтр 2
              </span>
              <span className="mb-4 border-b  border-b-gray-200 pb-1 m-2">
                Фильтр 3
              </span>
              <span className="mb-4 border-b  border-b-gray-200 pb-1 m-2">
                Фильтр 4
              </span>
              <span className="mb-4 border-b  border-b-gray-200 pb-1 m-2">
                Фильтр 5
              </span>
            </div>
          </div>

          <div className="w-full">
            <YMaps>
              <Map
                key={width}
                width={width}
                height={height}
                instanceRef={ref}
                defaultState={{
                  center: [45.19697869737061, 39.1890641332174],
                  zoom: 10,
                }}
              >
                <TypeSelector />

                <ZoomControl />

                {allPolygons?.data?.markers?.map((item) => {
                  return (
                    <Placemark
                      key={item?.id}
                      geometry={item?.center}
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.id}?lon=${item?.center[0]}&lat=${item?.center[1]}`
                        );
                      }}
                    />
                  );
                })}

                {allPolygons?.data?.polygons?.map((item) => {
                  return (
                    <Polygon
                      key={item?.id}
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.id}?lon=${item?.center[0]}&lat=${item?.center[1]}`
                        );
                      }}
                      options={{
                        hintContent: "Polygon",
                        fillColor: "#6699ff",
                        strokeWidth: 2,
                        opacity: 0.5,
                      }}
                      geometry={[item?.geo]}
                    />
                  );
                })}
              </Map>
            </YMaps>
          </div>
        </div>
      </div>

      <Drawer
        anchor="right"
        variant="persistent"
        open={Boolean(urlParams?.id)}
        onClose={() => {
          navigate("/");
        }}
      >
        <div
          style={{
            width: xs ? document.documentElement.clientWidth : "30rem",
          }}
          className="relative  p-4"
        >
          <IconButton
            className="!absolute !right-[15px] !top-0 !p-[10px]"
            onClick={() => {
              navigate("/");
            }}
          >
            <CloseOutlined />
          </IconButton>

          <IconButton
            className="!absolute  !top-0 !p-[10px]"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
          </IconButton>

          <h2 className="text-lg mt-6 mb-4"> Параметры территории</h2>

          {details?.isLoading && <LinearProgress />}

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач угла ориентации, градусы.:
            </span>
            <span className="text-left">
              {details?.data?.avg_relief_aspect}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач высоты местности, м.:
            </span>
            <span className="text-left">
              {details?.data?.avg_relief_height}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач угла местности, градусы.:
            </span>
            <span className="text-left">{details?.data?.avg_relief_slope}</span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач солнечных дней:
            </span>
            <span className="text-left">{details?.data?.avg_sunny_days}</span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Кол-во затопленных месяцев в году:
            </span>
            <span className="text-left">
              {converterFlooded(details?.data?.floodedMonths)}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">Лес:</span>
            <span className="text-left">
              {details?.data?.forest ? "Есть" : "Нет"}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон угла ориентации, градусы:
            </span>
            <span className="text-left">
              {details?.data?.min_relief_aspect} -{" "}
              {details?.data?.max_relief_aspect}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон высоты местности, м:
            </span>
            <span className="text-left">
              {details?.data?.min_relief_height} -{" "}
              {details?.data?.max_relief_height}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон угла местности, градусы:
            </span>
            <span className="text-left">
              {details?.data?.min_relief_slope} -{" "}
              {details?.data?.max_relief_slope}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон солнечных дней:
            </span>
            <span className="text-left">
              {details?.data?.min_sunny_days} - {details?.data?.max_sunny_days}
            </span>
          </div>

          {details?.data?.soil && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="mr-4 whitespace-nowrap">Тип почвы:</span>
              <span className="text-left">
                {converterSoil(details?.data?.soil)}
              </span>
            </div>
          )}

          {details?.data?.betterNearPolygons?.length > 0 && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="flex items-center mr-4 whitespace-nowrap">
                Похожие полигоны с лучшими условиями:
              </span>
              <span className="flex flex-col text-left">
                {details?.data?.betterNearPolygons?.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      key={index}
                      className="whitespace-nowrap"
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.id}?lon=${item?.center[0]}&lat=${item?.center[1]}`
                        );
                      }}
                    >
                      {item?.center?.[0]}, {item?.center?.[1]};
                    </a>
                  );
                })}
              </span>
            </div>
          )}

          {details?.data?.worseNearPolygons?.length > 0 && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="flex items-center mr-4 whitespace-nowrap">
                Похожие полигоны с условиями хуже:
              </span>
              <span className="flex flex-col text-left">
                {details?.data?.worseNearPolygons?.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      key={index}
                      className="whitespace-nowrap"
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.id}?lon=${item?.center[0]}&lat=${item?.center[1]}`
                        );
                      }}
                    >
                      {item?.center?.[0]}, {item?.center?.[1]};
                    </a>
                  );
                })}
              </span>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
});
