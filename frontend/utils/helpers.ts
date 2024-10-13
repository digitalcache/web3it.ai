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


export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      subdomain = candidate;
    }
  }
  return subdomain;
};