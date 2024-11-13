export const prependZeroToString = (str: string, strLength: number) => {
  return str.padStart(strLength, "0");
};

export const limitString = (str: string, limit: number = 20): string => {
  const words = str.split(" ");
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : str;
};

export const cleanRouteName = (routeName: string): string => {
  const removeSchemeRouteName = routeName.replace(/^http(s)?:\/\//, "");
  return removeSchemeRouteName.slice(removeSchemeRouteName.indexOf("/"));
};
