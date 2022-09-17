import React, { memo, useLayoutEffect, useState } from "react";
import {
  Map,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

export default memo(() => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(600);

  useLayoutEffect(() => {
    const el = document.getElementById("filters");

    setWidth(document.documentElement.clientWidth - el.clientWidth - 15);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full">
        <div
          className="w-full h-full max-w-[300px] shadow-2xl mr-3"
          id="filters"
        ></div>

        <div>
          <YMaps>
            <Map
              width={width}
              height={600}
              defaultState={{
                center: [45.19697869737061, 39.1890641332174],
                zoom: 8.4,
              }}
            >
              <TypeSelector />

              <ZoomControl />

              {/* <Placemark geometry={[55.7, 37.57]} /> */}

              <Polygon
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
  );
});
