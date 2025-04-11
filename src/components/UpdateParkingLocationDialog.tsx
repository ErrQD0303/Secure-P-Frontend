import React from "react";
import {
  CancelButton,
  DisabledIdTextField,
  EnableAvailableSpacesTextField,
  HiddenConcurrencyStampTextField,
  HiddenIdTextField,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTransition,
  UpdateButton,
} from "./UpdateParkingLocationDialog.style";
import {
  getParkingLocationById,
  IGetParkingLocationDto,
  IUpdateParkingLocationResponse,
} from "../services/parkingLocationService";
import Loader from "./Loader";
import {
  AddressTextField,
  CapacityField,
  DailyRateField,
  HourlyRateField,
  MonthlyRateField,
  NameTextField,
  StyledContainer,
  StyledError,
  StyledGridContainer,
  StyledPaper,
} from "../pages/AddNewParkingLocation.style";
import { useFetcher, useOutletContext } from "react-router-dom";

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

  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();

  const showError = !!response && !response?.success;

  const handleNumberChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (isNaN(value) || value < 0) {
        return 0;
      } else {
        return value;
      }
    },
    []
  );

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

  const handleHourlyRateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          hourly_rate: handleNumberChange(e),
        };
      }),
    [handleNumberChange]
  );

  const handleDailyRateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          daily_rate: handleNumberChange(e),
        };
      }),
    [handleNumberChange]
  );

  const handleMonthlyRateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          monthly_rate: handleNumberChange(e),
        };
      }),
    [handleNumberChange]
  );

  const handleCapacityChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          capacity: handleNumberChange(e),
        };
      }),
    [handleNumberChange]
  );

  const handleAvailableSpacesChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setParkingLocation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          available_spaces: handleNumberChange(e),
        };
      }),
    [handleNumberChange]
  );
  const getParkingLocationByIdFromDb = React.useCallback(
    async (id: string) => {
      const response = await getParkingLocationById({ id });
      if (response?.success) {
        console.log(response.data);
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
      setParkingLocation(await getParkingLocationByIdFromDb(id));
    },
    [getParkingLocationByIdFromDb]
  );

  React.useEffect(() => {
    fetchParkingLocationById(parkingLocationId as string);

    return () => {
      setParkingLocation(undefined);
    };
  }, [logAlert, parkingLocationId, fetchParkingLocationById]);

  React.useEffect(() => {
    const setErrorsOnConcurrencyConflict = async function (id: string | null) {
      if (!id) return;
      const data = await getParkingLocationByIdFromDb(id);
      logAlert("Refetching new data", "info");

      if (!data) return;
      setParkingLocation((prev) => ({
        ...prev!,
        concurrency_stamp: data.concurrency_stamp,
      }));

      setResponse((prev) => ({
        ...prev!,
        errors: {
          ...prev?.errors,
          name:
            data.name === parkingLocation?.name
              ? prev?.errors.name
              : `Updated name: ${data.name}`,
          address:
            data.address === parkingLocation?.address
              ? prev?.errors.address
              : `Updated address: ${data.address}`,
          capacity:
            data.capacity === parkingLocation?.capacity
              ? prev?.errors.capacity
              : `Updated capacity: ${data.capacity}`,
          available_spaces:
            data.available_spaces === parkingLocation?.available_spaces
              ? prev?.errors.available_spaces
              : `Updated available spaces: ${data.available_spaces}`,
          hourly_rate:
            data.hourly_rate === parkingLocation?.hourly_rate
              ? prev?.errors.hourly_rate
              : `Updated hourly rate: ${data.hourly_rate}`,
          daily_rate:
            data.daily_rate === parkingLocation?.daily_rate
              ? prev?.errors.daily_rate
              : `Updated daily rate: ${data.daily_rate}`,
          concurrency_stamp:
            "This parking location was updated by someone else. Please review the changes.",
        },
      }));
    };

    if (fetcher.state === "submitting" || fetcher.state === "loading") {
      setIsLoading(true);
    } else {
      if (fetcher.data) {
        setIsLoading(false);
        setResponse(fetcher.data as IUpdateParkingLocationResponse);
        const response = fetcher.data as IUpdateParkingLocationResponse;
        if (response?.success) {
          logAlert(response?.message, "success");
          handleClose?.(true);
        } else {
          logAlert(response.message ?? response.errors.summary, "error");
          if (response.errors?.concurrency_stamp) {
            logAlert("Someone else has updated this parking location", "error");
            setErrorsOnConcurrencyConflict(parkingLocationId);
          }
        }
      }
    }
  }, [
    fetcher.state,
    fetcher.data,
    handleClose,
    logAlert,
    fetchParkingLocationById,
    parkingLocationId,
    getParkingLocationByIdFromDb,
    parkingLocation?.name,
    parkingLocation?.address,
    parkingLocation?.capacity,
    parkingLocation?.available_spaces,
    parkingLocation?.hourly_rate,
    parkingLocation?.daily_rate,
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
                <CapacityField
                  value={parkingLocation?.capacity}
                  error={!!response?.errors?.capacity}
                  helperText={response?.errors?.capacity}
                  onChange={handleCapacityChange}
                />
                <EnableAvailableSpacesTextField
                  value={parkingLocation?.available_spaces}
                  onChange={handleAvailableSpacesChange}
                  error={!!response?.errors?.available_spaces}
                  helperText={response?.errors?.available_spaces}
                />
                <HourlyRateField
                  value={parkingLocation?.hourly_rate}
                  error={!!response?.errors?.hourly_rate}
                  helperText={response?.errors?.hourly_rate}
                  onChange={handleHourlyRateChange}
                />
                <DailyRateField
                  value={parkingLocation?.daily_rate}
                  error={!!response?.errors?.daily_rate}
                  helperText={response?.errors?.daily_rate}
                  onChange={handleDailyRateChange}
                />
                <MonthlyRateField
                  value={parkingLocation?.monthly_rate}
                  error={!!response?.errors?.monthly_rate}
                  helperText={response?.errors?.monthly_rate}
                  onChange={handleMonthlyRateChange}
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
