import React from "react";
import {
  CancelButton,
  DisabledIdTextField,
  HiddenConcurrencyStampTextField,
  HiddenIdTextField,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTransition,
  UpdateButton,
  UpdateParkingLocationParkingZoneGridRecord,
} from "./UpdateParkingLocationDialog.style";
import {
  getParkingLocationById,
  IGetParkingLocationDto,
  IGetParkingLocationParkingZoneDto,
  IUpdateParkingLocationRequestParkingZoneError,
  IUpdateParkingLocationResponse,
} from "../services/parkingLocationService";
import Loader from "./Loader";
import {
  AddNewParkingZoneGrid,
  AddressTextField,
  DailyRateField,
  HourlyRateField,
  MonthlyRateField,
  NameTextField,
  ParkingRateSelectInput,
  ParkingZoneGridParent,
  StyledContainer,
  StyledError,
  StyledGridContainer,
  StyledPaper,
  TotalParkingLocationCapacityAndAvailableSpaces,
} from "../pages/AddNewParkingLocation.style";
import { useFetcher, useOutletContext } from "react-router-dom";
import { IParkingRates } from "../types/parking";

export interface UpdateParkingLocationDialogProps {
  parkingLocationId: string | null;
  open: boolean;
  handleClose?: (refetch: boolean) => void;
}

function UpdateParkingLocationDialog({
  parkingLocationId,
  open,
  handleClose,
}: UpdateParkingLocationDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [parkingLocation, setParkingLocation] = React.useState<
    IGetParkingLocationDto | undefined
  >(undefined);
  const [response, setResponse] =
    React.useState<IUpdateParkingLocationResponse | null>(null);
  const fetcher = useFetcher();

  // Prevent unnecessary re-renders by memoizing fetcher state
  // const fetcherState = React.useMemo(() => fetcher.state, [fetcher.state]);
  // const fetcherData = React.useMemo(() => fetcher.data, [fetcher.data]);
  const fetcherLoad = React.useMemo(() => fetcher.load, [fetcher.load]);
  const ref = React.useRef<string | null>(null);
  const currentIndex = React.useRef(parkingLocation?.parking_zones.length ?? 0);
  const [parkingRates, setParkingRates] = React.useState<IParkingRates[]>([]);

  const [parkingZones, setParkingZones] = React.useState<
    IGetParkingLocationParkingZoneDto[]
  >(parkingLocation?.parking_zones ?? []);
  const [selectedParkingRate, setSelectedParkingRate] =
    React.useState<IParkingRates | null>(null);

  const handleParkingRateChange = React.useCallback(
    (rate: string | null) => {
      setSelectedParkingRate(parkingRates.find((r) => r.id === rate) ?? null);
    },
    [parkingRates]
  );

  const [totalCapacity, totalAvailableSpaces] = React.useMemo(() => {
    return parkingZones.reduce(
      (acc, zone) => {
        acc[0] += zone.capacity;
        acc[1] += zone.available_spaces;
        return acc;
      },
      [0, 0] as number[]
    );
  }, [parkingZones]);

  const handleAddZone = () => {
    // setParkingLocation((prev) => ({
    //   ...prev!,
    //   parking_zones: [
    //     ...(prev?.parking_zones ?? []), // Ensure parking_zones is always an array
    //     {
    //       id: `new-${currentIndex.current++}`,
    //       name: `New Parking Zone`,
    //       capacity: 0,
    //       available_spaces: 0,
    //     },
    //   ],
    // }));
    setParkingZones((prev) => [
      ...prev,
      {
        id: `new-${currentIndex.current}`,
        name: `New Parking Zone`,
        capacity: 0,
        available_spaces: 0,
      },
    ]);
  };

  const handleRemoveZone = (removeId: string) => {
    // setParkingLocation((prev) => {
    //   return {
    //     ...prev!,
    //     parking_zones: (prev?.parking_zones ?? []).filter(
    //       ({ id }) => removeId !== id
    //     ), // Ensure parking_zones is always an array
    //   };
    // });
    setParkingZones((prev) => {
      return prev.filter(({ id }) => removeId !== id);
    });
  };

  const handleZoneChange = (
    changeId: string,
    newFieldValue: {
      field: string;
      value: number | string;
    }[]
  ) => {
    // setParkingLocation((prev) => ({
    //   ...prev!,
    //   parking_zones: (prev?.parking_zones ?? []).map((zone) => {
    //     if (zone.id !== changeId) return zone;

    //     const newZone = { ...zone };
    //     newFieldValue.forEach(({ field, value }) => {
    //       if (field === "capacity") {
    //         newZone.capacity = Number(value);
    //       } else if (field === "available_spaces") {
    //         newZone.available_spaces = Number(value);
    //       } else if (field === "name") {
    //         newZone.name = value as string;
    //       }
    //     });

    //     return newZone;
    //   }),
    // }));
    setParkingZones((prev) => {
      return prev.map((zone) => {
        if (zone.id !== changeId) return zone;

        const newZone = { ...zone };
        newFieldValue.forEach(({ field, value }) => {
          if (field === "capacity") {
            newZone.capacity = Number(value);
          } else if (field === "available_spaces") {
            newZone.available_spaces = Number(value);
          } else if (field === "name") {
            newZone.name = value as string;
          }
        });

        return newZone;
      });
    });
  };

  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();

  const showError = !!response && !response?.success;

  /* const handleNumberChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (isNaN(value) || value < 0) {
        return 0;
      } else {
        return value;
      }
    },
    []
  ); */

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          name: e.target.value,
        };
      });
    },
    []
  );

  const handleAddressChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          address: e.target.value,
        };
      });
    },
    []
  );

  const getParkingLocationByIdFromDb = React.useCallback(
    async (id: string) => {
      const response = await getParkingLocationById({ id });
      if (response?.success) {
        return response.data;
      } else {
        logAlert(
          response?.message ??
            response?.errors?.summary ??
            "Unexpected Error Occured. Please try again.",
          "error"
        );
      }
    },
    [logAlert]
  );

  const fetchParkingLocationById = React.useCallback(
    async (id: string) => {
      const data = await getParkingLocationByIdFromDb(id);
      setParkingLocation(data);
      setParkingZones(data?.parking_zones ?? []); // Ensure parking_zones is always an array
    },
    [getParkingLocationByIdFromDb]
  );

  React.useEffect(() => {
    if (ref.current === parkingLocationId) return;
    fetchParkingLocationById(parkingLocationId as string);
    ref.current = parkingLocationId; // This is to prevent the effect from running again if the id is the same in development mode (React.StrictMode).
    // This is a workaround for the double render issue in React.StrictMode.

    /* return () => {
      setParkingLocation(undefined);
    }; */
  }, [parkingLocationId, fetchParkingLocationById]);

  React.useEffect(() => {
    fetcherLoad("/parking-locations/add");
  }, [fetcherLoad]);

  React.useEffect(() => {
    const setErrorsOnConcurrencyConflict = async function (id: string | null) {
      if (!id) return;
      const data = await getParkingLocationByIdFromDb(id);
      logAlert("Refetching new data", "info");

      if (!data) return;

      setParkingLocation((prev) => ({
        ...prev!,
        parking_zones: prev?.parking_zones ?? [], // Ensure parking_zones is always an array
        concurrency_stamp: data.concurrency_stamp,
      }));

      setResponse((prev) => {
        const newResponse = { ...prev! };
        newResponse.errors = {
          ...prev?.errors,
          name:
            data.name === parkingLocation?.name
              ? prev?.errors.name
              : `Updated name: ${data.name}`,
          address:
            data.address === parkingLocation?.address
              ? prev?.errors.address
              : `Updated address: ${data.address}`,
          concurrency_stamp:
            "This parking location was updated by someone else. Please review the changes.",
          parking_rate_id:
            data.parking_rate.id === parkingLocation?.parking_rate.id &&
            data.parking_rate.daily_rate ===
              parkingLocation?.parking_rate.daily_rate &&
            data.parking_rate.hourly_rate ===
              parkingLocation?.parking_rate.hourly_rate &&
            data.parking_rate.monthly_rate ===
              parkingLocation?.parking_rate.monthly_rate
              ? prev?.errors.parking_rate_id
              : `Updated parking rate: ${data.parking_rate.id}`,
        };

        const parkingZonesErrors: {
          [key: string]: IUpdateParkingLocationRequestParkingZoneError | null;
        } = prev?.errors.parking_zones ?? {};
        data.parking_zones.forEach((zone) => {
          if (
            zone.capacity ===
            parkingLocation?.parking_zones.find((z) => z.id === zone.id)
              ?.capacity
          ) {
            parkingZonesErrors[zone.id] =
              prev?.errors.parking_zones?.[zone.id] ?? null;
          }
          if (
            zone.available_spaces ===
            parkingLocation?.parking_zones.find((z) => z.id === zone.id)
              ?.available_spaces
          ) {
            parkingZonesErrors[zone.id] =
              prev?.errors.parking_zones?.[zone.id] ?? null;
          }
          if (
            zone.name ===
            parkingLocation?.parking_zones.find((z) => z.id === zone.id)?.name
          ) {
            parkingZonesErrors[zone.id] =
              prev?.errors.parking_zones?.[zone.id] ?? null;
          }
        });

        const existedParkingZones = parkingZones.map((zone) => zone.id);
        const dbNewUpdatedParkingZones = data.parking_zones.filter(
          (zone) => !existedParkingZones.includes(zone.id)
        );

        dbNewUpdatedParkingZones.forEach((zone) => {
          parkingZonesErrors[zone.id] = {
            summary: `New parking zone added: ${zone.name}`,
          };
        });

        newResponse.errors.parking_zones = Object.fromEntries(
          Object.entries(parkingZonesErrors).filter(
            ([, error]) => error !== null
          )
        ) as { [key: string]: IUpdateParkingLocationRequestParkingZoneError };

        return newResponse;
      });

      setParkingZones((prev) => {
        const existedParkingZones = prev.map((zone) => zone.id);
        const dbNewUpdatedParkingZones = data.parking_zones.filter(
          (zone) => !existedParkingZones.includes(zone.id)
        );
        const deletedParkingZones = prev.filter(
          (zone) =>
            !zone.id.startsWith("new-") &&
            !data.parking_zones.map((z) => z.id).includes(zone.id)
        );

        return [...prev, ...dbNewUpdatedParkingZones].filter(
          (zone) => !deletedParkingZones.map((z) => z.id).includes(zone.id)
        );
      });
      // (prev) => {
      //   const existedParkingZones = prev.map((zone) => zone.id);
      //   const dbNewUpdatedParkingZones = data.parking_zones
      //     .map((zone) => zone.id)
      //     .filter((zone) => !existedParkingZones.includes(zone));
      //   console.log(existedParkingZones, dbNewUpdatedParkingZones);

      //   return [...prev, ...dbNewUpdatedParkingZones];
      // });
    };

    if (fetcher.state === "submitting" || fetcher.state === "loading") {
      setIsLoading(true);
    } else {
      if (fetcher.data) {
        setIsLoading(false);
        if (
          (fetcher.data as { parkingRates: IParkingRates[] }).parkingRates !==
          undefined
        ) {
          const parkingRates = (
            fetcher.data as { parkingRates: IParkingRates[] }
          ).parkingRates;
          setParkingRates(parkingRates);
          setSelectedParkingRate(
            parkingRates?.find(
              (rate) => rate.id === parkingLocation?.parking_rate.id
            ) ?? null
          );
        } else {
          setResponse(fetcher.data as IUpdateParkingLocationResponse);
          const response = fetcher.data as IUpdateParkingLocationResponse;
          if (response?.success) {
            logAlert(response?.message, "success");
            handleClose?.(true);
          } else {
            logAlert(
              response.message ??
                response.errors.summary ??
                "Un expected error occurs",
              "error"
            );
            if (response.errors?.concurrency_stamp) {
              logAlert(
                "Someone else has updated this parking location",
                "error"
              );
              setErrorsOnConcurrencyConflict(parkingLocationId);
            }
          }
        }
      }
    }

    return () => {
      fetcher.data = null;
    };
  }, [
    fetcher,
    fetcher.data,
    fetcher.state,
    getParkingLocationByIdFromDb,
    handleClose,
    logAlert,
    parkingLocation?.address,
    parkingLocation?.name,
    parkingLocation?.parking_rate.daily_rate,
    parkingLocation?.parking_rate.hourly_rate,
    parkingLocation?.parking_rate.id,
    parkingLocation?.parking_rate.monthly_rate,
    parkingLocation?.parking_zones,
    parkingLocationId,
    parkingZones,
  ]);

  const cancelWithoutRefetch = React.useCallback(() => {
    handleClose?.(false);
  }, [handleClose]);

  return (
    <StyledDialog
      open={open}
      TransitionComponent={StyledTransition}
      // keepMounted
      onClose={cancelWithoutRefetch}
      aria-describedby="alert-dialog-slide-description"
    >
      {isLoading && <Loader />}
      <StyledDialogTitle>Update Parking location</StyledDialogTitle>
      <StyledDialogContent>
        {/* <StyledDialogContentText id="alert-dialog-slide-description">
          Just test UI
        </StyledDialogContentText> */}
        <StyledContainer>
          <StyledPaper>
            <fetcher.Form method="PUT" id="update-parking-location-form">
              <StyledGridContainer>
                {showError && (
                  <StyledError
                    message={
                      response?.message ??
                      response?.errors?.summary ??
                      "Unexpected Error Occured"
                    }
                  />
                )}
                <DisabledIdTextField value={parkingLocationId ?? ""} />
                <HiddenIdTextField value={parkingLocationId ?? ""} />
                <HiddenConcurrencyStampTextField
                  value={parkingLocation?.concurrency_stamp}
                />
                <NameTextField
                  value={parkingLocation?.name}
                  error={!!response?.errors?.name}
                  helperText={response?.errors?.name}
                  onChange={handleNameChange}
                />
                <AddressTextField
                  value={parkingLocation?.address}
                  error={!!response?.errors?.address}
                  helperText={response?.errors?.address}
                  onChange={handleAddressChange}
                />
                <TotalParkingLocationCapacityAndAvailableSpaces
                  capacity={totalCapacity}
                  availableSpaces={totalAvailableSpaces}
                />
                <ParkingZoneGridParent>
                  {parkingZones.map((zone) => (
                    <UpdateParkingLocationParkingZoneGridRecord
                      key={zone.id}
                      zoneId={zone.id}
                      zone={zone}
                      handleZoneChange={handleZoneChange}
                      handleRemoveZone={handleRemoveZone}
                      error={response?.errors?.parking_zones?.[zone.id]}
                    />
                  ))}
                  <AddNewParkingZoneGrid handleAddZone={handleAddZone} />
                </ParkingZoneGridParent>
                <ParkingRateSelectInput
                  parkingRates={parkingRates}
                  userControlParkingRateId={selectedParkingRate?.id}
                  handleParkingRateChange={handleParkingRateChange}
                  errorEle={response?.errors?.parking_rate_id}
                />
                <HourlyRateField value={selectedParkingRate?.hourly} disabled />
                <DailyRateField value={selectedParkingRate?.daily} disabled />
                <MonthlyRateField
                  value={selectedParkingRate?.monthly}
                  disabled
                />
              </StyledGridContainer>
            </fetcher.Form>
          </StyledPaper>
        </StyledContainer>
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={cancelWithoutRefetch} />
        <UpdateButton form="update-parking-location-form" />
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default UpdateParkingLocationDialog;
