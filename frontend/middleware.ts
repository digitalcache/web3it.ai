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
    let currentHost;
    const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
    if (process.env.NODE_ENV === "production") {
      currentHost = hostname?.replace(`.${baseDomain}`, "");
    } else {
      currentHost = hostname?.split(":")[0].replace(".localhost", "");
    }
    if (!currentHost) {
      return NextResponse.next();
    }
    const subdomainData = subdomains.find((d: any) => d.subdomain === currentHost);
    if (subdomainData) {
      return NextResponse.rewrite(new URL(`/${currentHost}${pathname}`, req.url));
    }
    if (pathname === "/" && (currentHost === baseDomain)) {
      return NextResponse.rewrite(new URL(`/home`, req.url));
    }
    return NextResponse.next();
};