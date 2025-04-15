import React from "react";
import {
  AddButton,
  AddForm,
  AddNewParkingZoneGrid,
  AddressTextField,
  CancelButton,
  DailyRateField,
  HourlyRateField,
  MonthlyRateField,
  NameTextField,
  ParkingRateSelectInput,
  ParkingZoneGridParent,
  ParkingZoneGridRecord,
  StyledContainer,
  StyledError,
  StyledPaper,
  TotalParkingLocationCapacityAndAvailableSpaces,
} from "./AddNewParkingLocation.style";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { IAddNewParkingLocationResponse } from "../services/parkingLocationService";
import { useSelector } from "react-redux";
import { getUserPermissions } from "../store/userSlice";
import { AppPolicy } from "../types/enum";
import { IParkingRates } from "../types/parking";

function AddNewParkingLocation() {
  const response = useActionData() as
    | IAddNewParkingLocationResponse
    | undefined
    | null;
  const showError = Boolean(response && !response?.success);
  const havePermission = useSelector(getUserPermissions).includes(
    AppPolicy.CreateParkingLocation
  );
  const currentIndex = React.useRef(0);
  const [parkingZones, setParkingZones] = React.useState<
    { capacity: number; availableSpaces: number; index: number }[]
  >([{ capacity: 1, availableSpaces: 1, index: currentIndex.current++ }]);
  const { parkingRates } = useLoaderData() as { parkingRates: IParkingRates[] };
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
        acc[1] += zone.availableSpaces;
        return acc;
      },
      [0, 0] as number[]
    );
  }, [parkingZones]);

  const handleAddZone = () => {
    setParkingZones((prev) => [
      ...prev,
      { capacity: 0, availableSpaces: 0, index: currentIndex.current++ },
    ]);
  };

  const handleRemoveZone = (removeIndex: number) => {
    setParkingZones((prev) => {
      return prev.filter(({ index }) => removeIndex !== index);
    });
  };

  const handleZoneChange = (
    index: number,
    newFieldValue: {
      field: string;
      value: number | string;
    }[]
  ) => {
    setParkingZones((prev) =>
      prev.map((zone) => {
        if (zone.index !== index) return zone;

        const newZone = { ...zone };
        newFieldValue.forEach(({ field, value }) => {
          if (field === "capacity") {
            newZone.capacity = Number(value);
          } else if (field === "availableSpaces") {
            newZone.availableSpaces = Number(value);
          }
        });

        return newZone;
      })
    );
  };

  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (response) {
      if (response?.success) {
        logAlert("Parking location added successfully", "success");
        return navigate("/parking-locations", {
          replace: false,
        });
      }

      logAlert(
        response?.message ??
          response?.errors?.summary ??
          "Unexpected Error Occured. Please try again.",
        "error"
      );
    }
  }, [response, logAlert, navigate]);

  React.useEffect(() => {
    if (!havePermission) {
      logAlert(
        "Forbidden! You do not have permission to add a new parking location.",
        "error"
      );
      return navigate("/parking-locations", {
        replace: false,
      });
    }
  }, [havePermission, logAlert, navigate]);

  return (
    <StyledContainer>
      <StyledPaper>
        <AddForm>
          {showError && (
            <StyledError
              message={
                response?.message ??
                response?.errors?.summary ??
                "Unexpected Error Occured"
              }
            />
          )}
          <NameTextField
            error={!!response?.errors?.name}
            helperText={response?.errors?.name}
          />
          <AddressTextField
            error={!!response?.errors?.address}
            helperText={response?.errors?.address}
          />
          <TotalParkingLocationCapacityAndAvailableSpaces
            capacity={totalCapacity}
            availableSpaces={totalAvailableSpaces}
          />
          <ParkingZoneGridParent>
            {parkingZones.map((zone) => (
              <ParkingZoneGridRecord
                key={zone.index}
                index={zone.index}
                zone={zone}
                handleZoneChange={handleZoneChange}
                handleRemoveZone={handleRemoveZone}
                error={response?.errors?.parking_zones?.[zone.index]}
              />
            ))}
            <AddNewParkingZoneGrid handleAddZone={handleAddZone} />
          </ParkingZoneGridParent>
          <ParkingRateSelectInput
            parkingRates={parkingRates}
            handleParkingRateChange={handleParkingRateChange}
            errorEle={response?.errors?.parking_rate_id}
          />
          <HourlyRateField value={selectedParkingRate?.hourly} disabled />
          <DailyRateField value={selectedParkingRate?.daily} disabled />
          <MonthlyRateField value={selectedParkingRate?.monthly} disabled />
          <CancelButton />
          <AddButton />
        </AddForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AddNewParkingLocation;
