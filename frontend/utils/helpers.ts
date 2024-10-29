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

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number: string) => {
  const parsedNumber = parseFloat(number)
  const tier = Math.log10(Math.abs(parsedNumber)) / 3 | 0;
  if (tier == 0) {
    return parsedNumber;
  }
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = parsedNumber / scale;
  return scaled + suffix;
}
