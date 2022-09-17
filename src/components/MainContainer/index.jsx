import { Drawer, IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import { parse } from "query-string";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryTerritoryDetails } from "../../quieries/useQueryTerritoryDetails";

import {
  Map,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

/* 
 ref.current?.setCenter([55.7, 37.57])
 
 */

export default memo(() => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(600);
  const [openDetails, setOpenDetails] = useState(false);
  const params = parse(location.search);

  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const details = useQueryTerritoryDetails(params, "");

  const ref = useRef();

  useLayoutEffect(() => {
    const el = document.getElementById("filters");

    setWidth(document.documentElement.clientWidth - el.clientWidth - 15);
    setHeight(el.clientHeight);
  }, []);

  useLayoutEffect(() => {
    if (params?.lat && params?.lon) {
      setTimeout(() => {
        setOpenDetails(true);

        ref.current?.setCenter([params?.lon, params?.lat]);

        navigate(`/?lon=${params?.lon}&lat=${params?.lat}`);
      }, 100);
    }
  }, [navigate, params?.lat, params?.lon]);

  useEffect(() => {
    const el = document.getElementById("filters");

    const init = () => {
      setWidth(document.documentElement.clientWidth - el.clientWidth - 15);
      setHeight(el.clientHeight);
    };

    document.addEventListener("resize", init);
    window.addEventListener("resize", init);
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
                  zoom: 8.4,
                }}
              >
                <TypeSelector />

                <ZoomControl />

                {/* <Placemark geometry={[55.7, 37.57]} /> */}

                <Polygon
                  onClick={() => {
                    setOpenDetails(true);
                    ref.current?.setCenter([
                      45.333314260624476, 39.38350121491304,
                    ]);
                    navigate("/?lon=45.333314260624476&lat=39.38350121491304");
                  }}
                  options={{
                    hintContent: "Polygon",
                    fillColor: "#6699ff",
                    strokeWidth: 2,
                    opacity: 0.5,
                  }}
                  geometry={[
                    [
                      [46.15385570157126, 39.12785595979559],
                      [45.24365765915663, 39.25547737240801],
                      [45.333314260624476, 39.38350121491304],
                      [46.222824169574056, 39.5119293629748],
                    ],
                  ]}
                />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>

      <Drawer
        anchor="right"
        variant="persistent"
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
          navigate("/");
        }}
      >
        <div
          style={{
            width: xs ? document.documentElement.clientWidth : "25rem",
          }}
          className="relative  p-4"
        >
          <IconButton
            className="!absolute !right-[15px] !top-0 !p-[10px]"
            onClick={() => {
              setOpenDetails(false);
              navigate("/");
            }}
          >
            <CloseOutlined />
          </IconButton>

          <h2 className="text-lg mt-6 mb-4"> Детали территории</h2>

          <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="mr-4 whitespace-nowrap">Долгота, широта:</span>
            <span className="text-left">45, 39</span>
          </div>
        </div>
      </Drawer>
    </>
  );
});
