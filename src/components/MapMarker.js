import * as React from "react";
import { Marker } from "react-map-gl";


function MapMarker(props) {
  const { data, onClick } = props;

  

  return data.map((event, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={event.geometry.coordinates[0]}
      latitude={event.geometry.coordinates[1]}
    >
        
    </Marker>
  ));
}

export default React.memo(MapMarker);
