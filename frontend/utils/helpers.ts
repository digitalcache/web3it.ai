import { 
  ClassValue, clsx,
} from "clsx";
import { twMerge } from "tailwind-merge";


export const serialize = (obj: any) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
