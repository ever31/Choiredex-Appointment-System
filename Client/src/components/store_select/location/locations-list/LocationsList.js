/** @format
 * Component that list all available Locations from API and allow users to pick one
 */
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import LocationsListItem from "./LocationsListItem";


const LocationsList = (props) => {


  return (
    <Box mt={2}>
      <List
        sx={{
          width: "100%",
        }}
      >
        {/* {result.map((item) => ( */}
          <LocationsListItem
            // key={item.location.name}
            // location={item}
            // selectedLocation={selectedLocation}
            // selectLocation={() => selectLocation(item)}
          />
        {/* ))} */}
      </List>
    </Box>
  );
};

export default LocationsList;
