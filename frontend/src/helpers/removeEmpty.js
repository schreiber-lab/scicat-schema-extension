import { isObject } from "lodash";

export const removeEmpty = (object, isEmpty) => {
  if (!isObject(object)) {
    return object;
  }

  const isArray = Array.isArray(object);
  const result = Object.entries(object)
    .filter((entry) => !isEmpty(entry[1]))
    .map(([key, value]) => {
      const result =
        value === Object(value) ? removeEmpty(value, isEmpty) : value;

      return isArray ? result : [key, result];
    });

  return isArray ? result : Object.fromEntries(result);
};
