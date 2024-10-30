import { ObjectAssignType } from "../carousel.d";

export const objectsAssign = (one: ObjectAssignType, two: ObjectAssignType) => {
  const res: ObjectAssignType = {};

  Object.keys(one).forEach((key) => {
    res[key] = one[key];
  });

  Object.keys(two).forEach((key) => {
    if (typeof two[key] === "object") {
      res[key] = objectsAssign(
        (res[key] || {}) as ObjectAssignType,
        two[key] as ObjectAssignType
      );
      return;
    }
    res[key] = two[key];
  });

  return res;
};
