// ../types/enum.ts
export enum Country {
  NOT_SET = "",
  VN = "Viet Nam",
  US = "United States",
  AUS = "Australia",
  NZL = "New Zealand",
}

export enum IProductType {
  Tenant = 0,
  NonTenant = 1,
}

export enum AppPolicy {
  None = "None",
  AnonymousAccess = "AnonymousAccess",
  GetInfo = "GetInfo",
  ResendEmailConfirmation = "ResendEmailConfirmation",
  UpdateProfile = "UpdateProfile",
  ChangePassword = "ChangePassword",
  CreateUser = "CreateUser",
  ReadUser = "ReadUser",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",
  ChangeAvatar = "ChangeAvatar",
  CreateParkingLocation = "CreateParkingLocation",
  ReadParkingLocation = "ReadParkingLocation",
  UpdateParkingLocation = "UpdateParkingLocation",
  DeleteParkingLocation = "DeleteParkingLocation",
  NormalUser = "NormalUser",
  Administrator = "Administrator",
}

export enum ParkingLocationSortBy {
  Name = 0,
  Address = 1,
  Capacity = 2,
  AvailableSpaces = 3,
  HourlyRate = 4,
  DailyRate = 5,
  MonthlyRate = 6,
}
