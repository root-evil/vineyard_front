import React from "react";
import {
  Map,
  Placemark,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <YMaps>
        <Map
          width={500}
          height={600}
          defaultState={{ center: [55.75, 37.57], zoom: 10 }}
        >
          <TypeSelector />

          <ZoomControl />

          <Placemark geometry={[55.7, 37.57]} />

          <Polygon
            options={{
              hintContent: "Polygon",
              fillColor: "#6699ff",
              strokeWidth: 2,
              opacity: 0.5,
            }}
            geometry={[
              [
                [55.752, 37.6175],
                [55.75, 37.57],
                [55.57, 37.12],
                [55.1, 37],
                [55, 36.9999],
              ],
            ]}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default App;
