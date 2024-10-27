import {
  ClassValue, clsx,
} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const camelToSnakeCase = (propertyName: string) => propertyName
  .replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToSnakeCase = (object: any): any => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [camelToSnakeCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToSnakeCase(value);
      return [camelToSnakeCase(key), parsedNestedObject];
    }),
  );
};
