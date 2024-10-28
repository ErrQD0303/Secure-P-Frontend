import { IUser } from "../../types/user";

export const FAKE_USER: IUser = {
  id: "US1",
  username: "datvipcrvn",
  fullName: "Nguyễn Quốc Đạt",
  dayOfBirth: new Date("1996-03-03"),
  email: "datvipcrvn@gmail.com",
  mobileNumber: "0123456789",
  city: "Hồ Chí Minh",
  country: "Vietnam",
  postCode: "700000",
  addressLine1: "123 Đường ABC",
  addressLine2: "",
  licensePlateNumber: "51A-12345",
};

export const FAKER_USER_PASSWORD = "Admin@123";

export const FAKE_TOKEN = "123456";

export const FAKE_VALIDATION_CODE = "123456";
