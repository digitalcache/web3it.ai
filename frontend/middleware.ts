import { NextRequest, NextResponse } from "next/server";
import subdomains from "./subdomains.json";

export const config = {
    matcher: [
      "/((?!api/|_next/|_static/|images|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};


export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const pathname = url.pathname;
  
    const hostname = req.headers.get("host");
    console.log(hostname)
    let currentHost;
    if (process.env.NODE_ENV === "production") {
      const baseDomain = process.env.BASE_DOMAIN;
      currentHost = hostname?.replace(`.${baseDomain}`, "");
    } else {
      currentHost = hostname?.split(":")[0].replace(".localhost", "");
    }
    if (!currentHost) {
      return NextResponse.next();
    }
    console.log("current", currentHost)
    const subdomainData = subdomains.find((d: any) => d.subdomain === currentHost);
    if (subdomainData) {
        return NextResponse.rewrite(new URL(`/${currentHost}${pathname}`, req.url));
    }
  
    return NextResponse.next();
};