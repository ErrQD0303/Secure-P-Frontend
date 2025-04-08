import React from "react";
import {
  AddButton,
  AddForm,
  AddressTextField,
  AvailableSpacesField,
  CancelButton,
  CapacityField,
  DailyRateField,
  HourlyRateField,
  MonthlyRateField,
  NameTextField,
  StyledContainer,
  StyledError,
  StyledPaper,
} from "./AddNewParkingLocation.style";
import { useActionData, useNavigate, useOutletContext } from "react-router-dom";
import { IAddNewParkingLocationResponse } from "../services/parkingLocationService";
import { useSelector } from "react-redux";
import { getUserPermissions } from "../store/userSlice";
import { AppPolicy } from "../types/enum";

function AddNewParkingLocation() {
  const [currentCapacity, setCurrentCapacity] = React.useState<number>(0);
  const HandleCapacityChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (isNaN(value) || value < 0) {
        setCurrentCapacity(0);
      } else {
        setCurrentCapacity(value);
      }
    },
    []
  );
  const response = useActionData() as
    | IAddNewParkingLocationResponse
    | undefined
    | null;
  const showError = Boolean(response && !response?.success);
  const havePermission = useSelector(getUserPermissions).includes(
    AppPolicy.CreateParkingLocation
  );

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
          <CapacityField
            error={!!response?.errors?.capacity}
            helperText={response?.errors?.capacity}
            value={currentCapacity}
            onChange={HandleCapacityChange}
          />
          <AvailableSpacesField value={currentCapacity} />
          <HourlyRateField
            error={!!response?.errors?.hourly_rate}
            helperText={response?.errors?.hourly_rate}
          />
          <DailyRateField
            error={!!response?.errors?.daily_rate}
            helperText={response?.errors?.daily_rate}
          />
          <MonthlyRateField
            error={!!response?.errors?.monthly_rate}
            helperText={response?.errors?.monthly_rate}
          />
          <CancelButton />
          <AddButton />
        </AddForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AddNewParkingLocation;
