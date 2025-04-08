import Container, { ContainerProps } from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
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
} from "../services/parkingLocationService";
import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import dayjs, { Dayjs } from "dayjs";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { IUserParkingSubscriptionResponse } from "../services/userService";
import { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
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

  const {
    formInputs,
    parkingLocations: defaultParkingLocations,
    changeSignageFee,
    clampingFee,
  } = useLoaderData() as {
    formInputs: Array<NewSubscriptionAdditionalProps>;
    parkingLocations: IParkingLocation[];
    changeSignageFee: number;
    clampingFee: number;
  };

  const [response, setResponse] =
    React.useState<IUserParkingSubscriptionResponse | null>(null);

  const [parkingLocations, setParkingLocations] = React.useState<
    IParkingLocation[]
  >(defaultParkingLocations ?? []);
  const [resetParkingZoneKey, setResetParkingZoneKey] =
    React.useState<boolean>(true);
  const [currentParkingLocationWithZone, setCurrentParkingLocationWithZone] =
    React.useState<IParkingLocationWithZones | null>(null);
  const productTypeInput = React.useMemo(
    () => formInputs.find((input) => input.name === "product-type"),
    [formInputs]
  );

  if (productTypeInput) {
    if (productTypeInput) {
      productTypeInput.error = Boolean(response?.errors?.product_type);
    }
    productTypeInput.errorMessage = response?.errors?.product_type;
  }

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
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

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

  const fetcher = useFetcher();

  const handleFormSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const productType = formData.get("product-type");
      if (productType !== null) {
        formData.set("product-type", String(+productType - 1));
      }

      formData.set(
        "parking-location",
        currentParkingLocationWithZone?.id ?? ""
      );

      formData.set(
        "parking-zone",
        currentParkingLocationWithZone?.currentParkingZone?.id ?? ""
      );

      fetcher.submit(formData, {
        method: "POST",
        encType: "application/x-www-form-urlencoded",
      });
    },
    [fetcher, currentParkingLocationWithZone]
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
      setResetParkingZoneKey((prev) => !prev);
    },
    []
  );

  if (parkingLocationInput) {
    parkingLocationInput.error = Boolean(response?.errors?.parking_location);
    parkingLocationInput.errorMessage = response?.errors?.parking_location;

    if (parkingLocationInput && parkingLocationInput.autoCompleteProps) {
      parkingLocationInput.autoCompleteProps.options = parkingLocations;
      parkingLocationInput.autoCompleteProps.onInputChange =
        handleParkingLocationInputChange;
      parkingLocationInput.autoCompleteProps.onHighlightChange =
        handleParkingLocationHightLightChange;
      parkingLocationInput.autoCompleteProps.onChange =
        handleParkingLocationChange;
    }
  }

  const [parkingZones, setParkingZone] = React.useState<IParkingZone[]>([]);

  const handleParkingZoneInputChange = React.useCallback(
    async (_event: React.SyntheticEvent, value: string) => {
      const parkingLocationId = currentParkingLocationWithZone?.id;
      const updatedParkingZone = await fetchUpdatedParkingZones(
        parkingLocationId,
        value
      );
      setParkingZone(updatedParkingZone);
    },
    [currentParkingLocationWithZone?.id]
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
      const parkingLocationId = currentParkingLocationWithZone?.id;
      const updatedParkingZone = await fetchUpdatedParkingZones(
        parkingLocationId,
        null
      );
      setParkingZone(updatedParkingZone);
    },
    [currentParkingLocationWithZone?.id]
  );

  const parkingZoneInput = React.useMemo(
    () => formInputs.find((input) => input.name === "parking-zone"),
    [formInputs]
  );

  if (parkingZoneInput) {
    parkingZoneInput.error = Boolean(response?.errors?.parking_zone);
    parkingZoneInput.errorMessage = response?.errors?.parking_zone;

    if (parkingZoneInput && parkingZoneInput.autoCompleteProps) {
      parkingZoneInput.autoCompleteProps.options = parkingZones;
      parkingZoneInput.autoCompleteProps.onInputChange =
        handleParkingZoneInputChange;
      parkingZoneInput.autoCompleteProps.onHighlightChange =
        handleParkingZoneHightLightChange;
      parkingZoneInput.autoCompleteProps.onChange = handleParkingZoneChange;
      parkingZoneInput.autoCompleteProps.resetStateKey = resetParkingZoneKey;
    }
  }

  const parkingInfoGridBox = React.useMemo(() => {
    return formInputs.find((input) => input.name === "parking-info");
  }, [formInputs]);

  if (parkingInfoGridBox) {
    parkingInfoGridBox.isShown = !!currentParkingLocationWithZone;
    const parkingLocationMetaInfo = parkingInfoGridBox.values?.find(
      (pi) => pi.name === "parking-location-meta-info"
    );
    if (parkingLocationMetaInfo) {
      const parkingLocationNameText = parkingLocationMetaInfo.values?.find(
        (plmi) => plmi.name === "parking-location-name"
      );
      if (parkingLocationNameText)
        parkingLocationNameText.value =
          currentParkingLocationWithZone?.name?.slice(0, -8);
      const parkingLocationAddressText = parkingLocationMetaInfo.values?.find(
        (plmi) => plmi.name === "parking-location-address"
      );
      if (parkingLocationAddressText)
        parkingLocationAddressText.value =
          currentParkingLocationWithZone?.address;
    }
    const parkingLocationAdditionalInfo = parkingInfoGridBox.values?.find(
      (pi) => pi.name === "parking-location-additional-info"
    );
    if (parkingLocationAdditionalInfo) {
      const parkingLocationAvailableSpacesText =
        parkingLocationAdditionalInfo.values?.find(
          (pi) => pi.name === "parking-location-available-spaces"
        );
      if (parkingLocationAvailableSpacesText) {
        const slotText =
          currentParkingLocationWithZone?.availableSpaces &&
          currentParkingLocationWithZone?.availableSpaces > 1
            ? "slots"
            : "slot";
        parkingLocationAvailableSpacesText.value =
          currentParkingLocationWithZone?.availableSpaces &&
          `${currentParkingLocationWithZone?.availableSpaces} ${slotText} available`;
      }

      const parkingZoneNameText = parkingLocationAdditionalInfo.values?.find(
        (pi) => pi.name === "parking-zone-name"
      );
      if (parkingZoneNameText) {
        parkingZoneNameText.value =
          currentParkingLocationWithZone?.currentParkingZone?.name &&
          `Parking Zone ${currentParkingLocationWithZone?.currentParkingZone?.name}`;
      }
    }
  }

  const handleFromTimeChange = React.useCallback((date: Dayjs | null) => {
    setStartDate(date);
  }, []);

  const handleToTimeChange = React.useCallback((date: Dayjs | null) => {
    setEndDate(date);
  }, []);

  const dateRangeGridBox = React.useMemo(() => {
    return formInputs.find((input) => input.name === "duration");
  }, [formInputs]);
  if (dateRangeGridBox) {
    if (dateRangeGridBox.fromDateProps) {
      dateRangeGridBox.fromDateProps.value = startDate;
      dateRangeGridBox.fromDateProps.onChange = handleFromTimeChange;
      (
        dateRangeGridBox.fromDateProps as DateTimePickerProps<
          Dayjs,
          boolean
        > & {
          error?: boolean;
          errorMessage?: string;
        }
      ).error = Boolean(response?.errors?.start_date);
      (
        dateRangeGridBox.fromDateProps as DateTimePickerProps<
          Dayjs,
          boolean
        > & {
          error?: boolean;
          errorMessage?: string;
        }
      ).errorMessage = response?.errors?.start_date;
    }
    if (dateRangeGridBox.toDateProps) {
      dateRangeGridBox.toDateProps.value = endDate;
      dateRangeGridBox.toDateProps.onChange = handleToTimeChange;
      (
        dateRangeGridBox.toDateProps as DateTimePickerProps<Dayjs, boolean> & {
          error?: boolean;
          errorMessage?: string;
        }
      ).error = Boolean(response?.errors?.end_date);
      (
        dateRangeGridBox.toDateProps as DateTimePickerProps<Dayjs, boolean> & {
          error?: boolean;
          errorMessage?: string;
        }
      ).errorMessage = response?.errors?.end_date;
    }
  }
  const [haveChangeSignage, setHaveChangeSignage] =
    React.useState<boolean>(true);
  const [haveClamping, setHaveClamping] = React.useState<boolean>(true);

  const otherChargeGrid = React.useMemo(() => {
    return formInputs.find((input) => input.name === "other-charge");
  }, [formInputs]);

  const handleChangeSignageFee = React.useCallback(() => {
    setHaveChangeSignage((prev) => !prev);
  }, []);

  const handleChangeClampingFee = React.useCallback(() => {
    setHaveClamping((prev) => !prev);
  }, []);

  if (otherChargeGrid) {
    const changeSignageCheckbox = otherChargeGrid.values?.find(
      (oc) => oc.name === "changeSignageFee"
    );
    if (changeSignageCheckbox) {
      changeSignageCheckbox.value = haveChangeSignage;
      changeSignageCheckbox.onChange = handleChangeSignageFee;
    }
    const clampingCheckbox = otherChargeGrid.values?.find(
      (oc) => oc.name === "clampingFee"
    );
    if (clampingCheckbox) {
      clampingCheckbox.value = haveClamping;
      clampingCheckbox.onChange = handleChangeClampingFee;
    }
  }

  const { totalFee, subscriptionFee } = React.useMemo(() => {
    let subscriptionFee = 0;
    if (
      !currentParkingLocationWithZone ||
      !currentParkingLocationWithZone.currentParkingZone ||
      !endDate ||
      !startDate
    ) {
      return {
        totalFee: 0,
        subscriptionFee,
      };
    }
    let totalFee = 0;
    if (haveChangeSignage) totalFee += changeSignageFee;
    if (haveClamping) totalFee += clampingFee;
    const daysDiff = endDate.diff(startDate) / (24 * 60 * 60 * 1000);
    if (daysDiff < 1) {
      subscriptionFee =
        currentParkingLocationWithZone.rates.hourly * Math.ceil(daysDiff * 24);
    } else if (daysDiff < 30) {
      subscriptionFee =
        currentParkingLocationWithZone.rates.daily * Math.ceil(daysDiff);
    } else
      subscriptionFee =
        currentParkingLocationWithZone.rates.monthly * Math.ceil(daysDiff / 30);

    subscriptionFee = subscriptionFee < 0 ? 0 : subscriptionFee;
    totalFee += subscriptionFee;
    return { totalFee, subscriptionFee };
  }, [
    changeSignageFee,
    clampingFee,
    currentParkingLocationWithZone,
    endDate,
    haveChangeSignage,
    haveClamping,
    startDate,
  ]);

  const outputFeeData = React.useMemo(
    () => [
      {
        name: "Subscription Fee",
        type: "box",
        parentElementProps: {
          direction: "row",
          sx: {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        value: <Box className="Mui-Fee-Box">{`$${subscriptionFee}`}</Box>,
      },
      {
        name: "Clamping Fee",
        type: "box",
        parentElementProps: {
          direction: "row",
          sx: {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        value: (
          <Box className="Mui-Fee-Box">{`$${
            haveClamping ? clampingFee : 0
          }`}</Box>
        ),
      },
      {
        name: "Change Signage Fee",
        type: "box",
        parentElementProps: {
          direction: "row",
          sx: {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        value: (
          <Box className="Mui-Fee-Box">{`$${
            haveChangeSignage ? changeSignageFee : 0
          }`}</Box>
        ),
      },
      {
        name: "Total Amount",
        type: "box",
        parentElementProps: {
          direction: "row",
          sx: {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        value: (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <Box component={"span"} className="Mui-DollarSign-Box">
              $
            </Box>
            <Box className="Mui-TotalFee-Box">{`${totalFee}`}</Box>
          </Stack>
        ),
      },
    ],
    [
      subscriptionFee,
      clampingFee,
      changeSignageFee,
      totalFee,
      haveClamping,
      haveChangeSignage,
    ]
  );

  const feeDataGridBox = React.useMemo(() => {
    return formInputs.find((input) => input.name === "fee-data");
  }, [formInputs]);

  if (feeDataGridBox) {
    feeDataGridBox.values = outputFeeData;
  }

  const { renderInput } = useRenderInput();
  const { routeName } = useOutletContext() as { routeName: string };

  React.useEffect(() => {
    if (fetcher.data) {
      setResponse(fetcher.data as IUserParkingSubscriptionResponse);
    }
  }, [fetcher.data]);

  return (
    <StyledContainer
      sx={{
        ...sx, // Merge the passed sx with the default ones
      }}
      {...props}
    >
      <Paper
        sx={{
          border: 0,
          boxShadow: 0,
          [theme.breakpoints.up("md")]: {
            border: "1px solid #D8E0ED",
            boxShadow: "0px 4px 4px 0px #B8C5D033",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <Container
          sx={{
            p: 0,
            [theme.breakpoints.up("md")]: {
              p: 6,
            },
          }}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
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
          </Stack>
          {response?.message && <Grid>{response?.message}</Grid>}
          <fetcher.Form method="POST" onSubmit={handleFormSubmit}>
            <Grid
              container
              sx={{
                width: "100%",
              }}
              columns={{
                base: 12,
              }}
              rowGap={{
                base: 3,
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
          </fetcher.Form>
        </Container>
      </Paper>
    </StyledContainer>
  );
}

export default AddNewSubscription;
