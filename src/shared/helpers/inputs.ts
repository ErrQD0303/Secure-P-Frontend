import { Grid2Props } from "@mui/material/Grid2";
import { NewSubscriptionAdditionalProps } from "../../pages/addNewSubscriptionLoader";

export const isAddNewSubscriptionPropsType = (
  input: unknown
): input is NewSubscriptionAdditionalProps => {
  return !!input && (input as Grid2Props) !== undefined;
};
