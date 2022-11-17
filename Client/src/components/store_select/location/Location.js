import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";

import InitialPosition from "./initial-position/InitialPosition";
import LocationsList from "./locations-list/LocationsList";
import Map from "./map/Map";

const locations = [
  {
    name: "Belle-et-Houllefort",
    address: "Route sans nom, 54530 Bayonville-sur-Mad, France",
    coordinates: {
      lat: 50.745881, 
      lng: 1.759262,
    },
    location_code: "ChIJS7N8uP4z3EcRjMgFQmjNs_0",
    group_id: 1,
    countryID: "FR"
  },
]

import TravelModes from "./travel-modes/TravelModes";

const Location = (props) => {
  const {
  locations,
  position,
  setPosition,
  travelMode,
  setTravelMode,
  selectedLocation,
  setSelectedLocation,
  } = props;
  
  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <InitialPosition position={position} setPosition={setPosition} />
          <TravelModes travelMode={travelMode} setTravelMode={setTravelMode} />
          <LocationsList
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            position={position}
            travelMode={travelMode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Map
            locations={locations}
            position={position}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Location;
