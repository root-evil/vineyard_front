import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  LinearProgress,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowBack, Close, CloseOutlined } from "@material-ui/icons";
import { parse } from "query-string";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryTerritoryParams } from "../../quieries/useQueryTerritoryParams";

import clsx from "clsx";
import {
  Map,
  Placemark,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";
import { usePressEscape } from "../../hooks/usePressEscape";
import { useQueryTerritoryDetails } from "../../quieries/useQueryTerritoryDetails";
import { useQueryTerritorys } from "../../quieries/useQueryTerritorys";
import { get, showError } from "../../store/api";
import MigomTable from "../System/MigomTable";
import Filters from "./Filters";

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

const useStyles = makeStyles({
  paper: {
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default memo(() => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const urlParams = useParams();
  const location = useLocation();
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(600);
  const [filters, setFilters] = useState({});
  const [filtersValues, setFiltersValues] = useState({});
  const [currentBounds, setCurrentBounds] = useState([]);
  const [paramsId, setParamsId] = useState("");
  const allPolygons = useQueryTerritorys(filters, currentBounds);
  const [render, setRender] = useState(1);
  const params = parse(location.search);

  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const detailsParams = useQueryTerritoryParams(
    {
      id: urlParams?.id,
      ...params,
    },
    currentBounds
  );

  const territoryDetails = useQueryTerritoryDetails(paramsId);

  const ref = useRef();

  useLayoutEffect(() => {
    const el = document.getElementById("filters");

    setWidth(window.innerWidth - el.clientWidth);
    setHeight(el.clientHeight);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentBounds(ref.current?.getBounds());
    }, 700);
  }, []);

  useLayoutEffect(() => {
    if (params?.lat && params?.lon) {
      setTimeout(() => {
        ref.current?.setCenter([params?.lon, params?.lat]);
      }, 200);
    } else if (allPolygons?.data?.center) {
      setTimeout(() => {
        setCurrentBounds(allPolygons?.data?.bounds);
        ref.current?.setBounds(allPolygons?.data?.bounds);

        ref.current?.setCenter(allPolygons?.data?.center);
      }, 200);
    } else if (allPolygons?.data?.bounds) {
      setTimeout(() => {
        ref.current?.setBounds(allPolygons?.data?.bounds);
      }, 200);
    }
  }, [
    allPolygons?.data?.bounds,
    allPolygons?.data?.center,
    navigate,
    params.id,
    params?.lat,
    params?.lon,
    urlParams.id,
  ]);

  usePressEscape(() => navigate("/"), !urlParams?.id);

  useEffect(() => {
    const el = document.getElementById("filters");

    const init = () => {
      setWidth(window.innerWidth - el.clientWidth - 15);
      setHeight(el.clientHeight);
    };

    init();

    document.addEventListener("resize", init, false);
    window.addEventListener("resize", init, false);

    return () => {
      document.removeEventListener("resize", init);
      window.removeEventListener("resize", init);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBounds(ref.current?.getBounds());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = useMemo(() => {
    return [
      {
        Header: "Месяц",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.month;
        },
      },
      {
        Header: "Ср. кол-во осадков",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.pavg;
        },
      },
      {
        Header: "Макс. кол-во осадков",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.pmax;
        },
      },
      {
        Header: "Мин. кол-во осадков",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.pmin;
        },
      },
      {
        Header: "Ср. темп.",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.tavg;
        },
      },
      {
        Header: "Макс. темп.",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.tmax;
        },
      },
      {
        Header: "Мин. темп.",
        style: {
          textAlign: "center",
        },
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.tmin;
        },
      },
    ];
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex flex-col h-full sm:flex-row">
          <div
            className="w-full  max-w-full shadow-2xl border-r-2 border-[rgb(0 0 0 / 0.2)] sm:max-w-[340px] "
            id="filters"
          >
            <div className="flex flex-col mt-2 text-base">
              <h1 className="text-center text-xl mb-6">Фильтры</h1>

              <Filters
                filtersValues={filtersValues}
                setFiltersValues={setFiltersValues}
                render={render}
              />
            </div>

            <div className="flex justify-end items-end px-4 mb-4">
              {Object.keys(filters || {})?.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  className="!mr-2"
                  onClick={() => {
                    setFiltersValues({});
                    setFilters({});

                    setRender((prevState) => prevState + 1);
                  }}
                >
                  Очистить
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setFilters(filtersValues);
                }}
              >
                Применить
              </Button>
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
                          `/${item?.paramId}?lon=${item?.center[0]}&lat=${item?.center[1]}`
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
                          `/${item?.paramId}?lon=${item?.center[0]}&lat=${item?.center[1]}`
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

          {detailsParams?.isLoading && <LinearProgress />}

          <div className="flex justify-center mb-4">
            <div
              className={clsx(
                "relative flex justify-center items-center rounded-full w-[65px] h-[65px] border-2 text-xl  p-5",
                detailsParams?.data?.scoring <= 33.3333333 && "border-red-600",
                detailsParams?.data?.scoring > 33.3333333 &&
                  detailsParams?.data?.scoring <= 66.6666666 &&
                  "border-yellow-600",
                detailsParams?.data?.scoring > 66.6666666 && "border-green-600"
              )}
            >
              <span className="text-xl">{detailsParams?.data?.scoring}</span>
            </div>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач угла ориентации, градусы.:
            </span>
            <span className="text-left">
              {detailsParams?.data?.avg_relief_aspect}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач высоты местности, м.:
            </span>
            <span className="text-left">
              {detailsParams?.data?.avg_relief_height}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач угла местности, градусы.:
            </span>
            <span className="text-left">
              {detailsParams?.data?.avg_relief_slope}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Ср/знач солнечных дней:
            </span>
            <span className="text-left">
              {detailsParams?.data?.avg_sunny_days}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Кол-во затопленных месяцев в году:
            </span>
            <span className="text-left">
              {converterFlooded(detailsParams?.data?.floodedMonths)}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">Лес:</span>
            <span className="text-left">
              {detailsParams?.data?.forest ? "Есть" : "Нет"}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон угла ориентации, градусы:
            </span>
            <span className="text-left">
              {detailsParams?.data?.min_relief_aspect} -{" "}
              {detailsParams?.data?.max_relief_aspect}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон высоты местности, м:
            </span>
            <span className="text-left">
              {detailsParams?.data?.min_relief_height} -{" "}
              {detailsParams?.data?.max_relief_height}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон угла местности, градусы:
            </span>
            <span className="text-left">
              {detailsParams?.data?.min_relief_slope} -{" "}
              {detailsParams?.data?.max_relief_slope}
            </span>
          </div>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">
              Диапазон солнечных дней:
            </span>
            <span className="text-left">
              {detailsParams?.data?.min_sunny_days} -{" "}
              {detailsParams?.data?.max_sunny_days}
            </span>
          </div>

          {detailsParams?.data?.soil && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="mr-4 whitespace-nowrap">Тип почвы:</span>
              <span className="text-left">
                {converterSoil(detailsParams?.data?.soil)}
              </span>
            </div>
          )}

          {detailsParams?.data?.betterNearPolygons?.length > 0 && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="flex items-center mr-4 whitespace-nowrap">
                Похожие полигоны с лучшими условиями:
              </span>
              <span className="flex flex-col text-left">
                {detailsParams?.data?.betterNearPolygons?.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      key={index}
                      className="whitespace-nowrap"
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.paramId}?lon=${item?.center[0]}&lat=${item?.center[1]}`
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

          {detailsParams?.data?.worseNearPolygons?.length > 0 && (
            <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
              <span className="flex items-center mr-4 whitespace-nowrap">
                Похожие полигоны с условиями хуже:
              </span>
              <span className="flex flex-col text-left">
                {detailsParams?.data?.worseNearPolygons?.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      key={index}
                      className="whitespace-nowrap"
                      onClick={() => {
                        ref.current?.setCenter(item?.center);
                        navigate(
                          `/${item?.paramId}?lon=${item?.center[0]}&lat=${item?.center[1]}`
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

          <div className="flex justify-between items-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setParamsId(detailsParams?.data?.id);
              }}
            >
              Детали
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  await get(
                    `http://51.250.23.5:9001/users/contact/${detailsParams?.data?.id}`
                  );
                } catch (err) {
                  showError(err);
                  return;
                }
              }}
            >
              Связаться с владельцем
            </Button>
          </div>
        </div>
      </Drawer>

      <Dialog
        open={Boolean(paramsId)}
        disableEnforceFocus={true}
        onClick={(e) => e.stopPropagation()}
        classes={{ paper: classes.paper }}
        onClose={() => setParamsId("")}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {" "}
          <IconButton onClick={() => setParamsId("")} className={classes.close}>
            <Close />
          </IconButton>
          Детали
        </DialogTitle>

        <DialogContent>
          <div className="w-full overflow-hidden relative min-h-96 max-h-96">
            <MigomTable columns={columns} data={territoryDetails?.data || []} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});
