import Container, { ContainerProps } from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { NewSubscriptionAdditionalProps } from "./addNewSubscriptionLoader";
import { useRenderInput } from "../hooks/useRenderInput";
import Grid from "@mui/material/Grid2";
import addNewSubscriptionImage from "/AddNewSubscriptionHeaderImage.png"; // import addNewSubscriptionImage from "addNewSubscriptionImage";
import Box from "@mui/material/Box";
import React from "react";
import {
  IParkingLocation,
  IParkingLocationWithZones,
  IParkingZone,
} from "../types/parking";
import {
  fetchUpdatedParkingLocations,
  fetchUpdatedParkingZones,
} from "../services/parkingService";
import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
// import React from "react";

// StyledContainer with base styles
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingLeft: "1.437rem",
  paddingRight: "1.437rem",
  paddingBottom: "6.8rem",
  marginTop: "1.438rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    paddingBottom: 0,
  },
}));

// AddNewSubscription component accepts sx and merges it with default styles
function AddNewSubscription({ sx, ...props }: ContainerProps) {
  const theme = useTheme();
  const { formInputs, parkingLocations: defaultParkingLocations } =
    useLoaderData() as {
      formInputs: Array<NewSubscriptionAdditionalProps>;
      parkingLocations: IParkingLocation[];
    };
  const [parkingLocations, setParkingLocations] = React.useState<
    IParkingLocation[]
  >(defaultParkingLocations ?? []);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [currentParkingLocationWithZone, setCurrentParkingLocationWithZone] =
    React.useState<IParkingLocationWithZones | null>(null);
  const parkingLocationInput = React.useMemo(
    () => formInputs.find((input) => input.name === "parking-location"),
    [formInputs]
  );
  const handleParkingLocationInputChange = React.useCallback(
    async (_event: React.SyntheticEvent, value: string) => {
      const updatedParkingLocations = await fetchUpdatedParkingLocations(value);
      setParkingLocations(updatedParkingLocations);
    },
    []
  );

  const handleParkingLocationHightLightChange = React.useCallback(
    async (
      _event: React.SyntheticEvent,
      option: IParkingLocation | IParkingZone | null
    ) => {
      const fetchedParkingZones = await fetchUpdatedParkingZones(option?.id);
      setParkingZone(fetchedParkingZones);
      setCurrentParkingLocationWithZone(option as IParkingLocationWithZones);
    },
    []
  );

  const handleParkingLocationChange = React.useCallback(
    (
      _event: React.SyntheticEvent,
      _value: unknown,
      reason: AutocompleteChangeReason
    ) => {
      if (reason !== "clear") return;
      setCurrentParkingLocationWithZone(null);
      setParkingZone([]);
      if (ref.current) {
        const input = ref.current.querySelector("input");
        console.log(input);
        if (input) {
          input.value = "";
          input.setAttribute("value", "");
        }
      }
    },
    []
  );

  if (parkingLocationInput && parkingLocationInput.autoCompleteProps) {
    parkingLocationInput.autoCompleteProps.options = parkingLocations;
    parkingLocationInput.autoCompleteProps.onInputChange =
      handleParkingLocationInputChange;
    parkingLocationInput.autoCompleteProps.onHighlightChange =
      handleParkingLocationHightLightChange;
    parkingLocationInput.autoCompleteProps.onChange =
      handleParkingLocationChange;
  }

  const [parkingZones, setParkingZone] = React.useState<IParkingZone[]>([]);

  const handleParkingZoneInputChange = React.useCallback(
    async (_event: React.SyntheticEvent, value: string) => {
      const parkingLocationId = document
        .querySelector("[name=parking-location]")
        ?.getAttribute("value");
      const updatedParkingZone = await fetchUpdatedParkingZones(
        parkingLocationId,
        value
      );
      setParkingZone(updatedParkingZone);
    },
    []
  );

  const handleParkingZoneHightLightChange = React.useCallback(
    async (
      _event: React.SyntheticEvent,
      option: IParkingLocation | IParkingZone | null
    ) => {
      setCurrentParkingLocationWithZone(
        (prev) =>
          ({
            ...(prev || {}),
            currentParkingZone: option,
          } as IParkingLocationWithZones)
      );
    },
    []
  );

  const handleParkingZoneChange = React.useCallback(
    async (
      _event: React.SyntheticEvent,
      _value: unknown,
      reason: AutocompleteChangeReason
    ) => {
      if (reason !== "clear") return;
      setCurrentParkingLocationWithZone((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentParkingZone: undefined,
        };
      });
      const parkingLocationName = document
        .querySelector("[name=parking-location]")
        ?.getAttribute("value");
      const parkingLocationId = parkingLocations.find(
        (pl) =>
          console.log(parkingLocationName, parkingLocationName) ??
          pl.name === parkingLocationName
      )?.id;
      const updatedParkingZone = await fetchUpdatedParkingZones(
        parkingLocationId,
        null
      );
      setParkingZone(updatedParkingZone);
    },
    [parkingLocations]
  );

  const parkingZoneInput = React.useMemo(
    () => formInputs.find((input) => input.name === "parking-zone"),
    [formInputs]
  );

  if (parkingZoneInput && parkingZoneInput.autoCompleteProps) {
    parkingZoneInput.autoCompleteProps.options = parkingZones;
    parkingZoneInput.autoCompleteProps.onInputChange =
      handleParkingZoneInputChange;
    parkingZoneInput.autoCompleteProps.onHighlightChange =
      handleParkingZoneHightLightChange;
    parkingZoneInput.autoCompleteProps.onChange = handleParkingZoneChange;
    parkingZoneInput.ref = ref;
  }

  const { renderInput } = useRenderInput();
  const { routeName } = useOutletContext() as { routeName: string };
  return (
    <StyledContainer
      sx={{
        ...sx, // Merge the passed sx with the default ones
      }}
      {...props}
    >
      <Box
        component={"img"}
        src={addNewSubscriptionImage}
        aria-label="Header Image"
        sx={{
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
      />
      <Grid
        container
        sx={{
          width: "100%",
        }}
        columns={{
          base: 12,
        }}
      >
        {formInputs.map((input) =>
          renderInput({
            input,
            routeName,
            wrapper: (children: React.ReactNode, props) => (
              <Grid {...props}>{children}</Grid>
            ),
          })
        )}
      </Grid>
    </StyledContainer>
  );
}

export default AddNewSubscription;
