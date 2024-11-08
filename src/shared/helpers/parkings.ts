import { IProductType } from "../../types/enum";

export const getParkingType = (productType: IProductType) => {
  return productType === IProductType.Tenant ? "Monthly" : "Daily";
};
